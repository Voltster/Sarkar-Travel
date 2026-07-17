import { Package } from "@/types";

export const packages: Package[] = [
    {
        id: "2",
        slug: "kashi-prayagraj-spiritual-yatra",
        title: "Moksha Darshan: Kashi & Prayagraj Yatra",
        price: 18500,
        originalPrice: 21000,
        discount: 11,
        reservePrice: 1000,
        badge: "Holy Ganges Special",
        nights: 4,
        route: ["Varanasi (3N)", "Prayagraj (1N)"],
        duration: "5 Days & 4 Nights",
        location: "Varanasi",
        rating: 4.9,
        reviewsCount: 92,
        targetAudience: ["Families", "Spiritual Seekers"],
        tripPace: "Relaxed",
        startCity: "Varanasi",
        endCity: "Varanasi",
        bestTimeToVisit: "October to March",
        hotelQuality: "Heritage Hotels near Ganga Ghats",
        transportQuality: "Private AC Sedan",
        images: [
            "https://images.pexels.com/photos/8112557/pexels-photo-8112557.jpeg",
            "https://images.pexels.com/photos/27670662/pexels-photo-27670662.jpeg",
            "https://images.pexels.com/photos/31022593/pexels-photo-31022593.jpeg",
            "https://images.pexels.com/photos/30854355/pexels-photo-30854355.jpeg",
        ],
        highlights: [
            "Private Subah-e-Banaras Sunrise Boat Ride",
            "Kashi Vishwanath Corridor VIP Sugam Darshan",
            "Holy Sangam Bath in Prayagraj (Triveni)",
            "Ganga Aarti reserved seating at Dashashwamedh Ghat",
            "Traditional Banarasi Sattvik Thali lunch"
        ],
        overview: "Deepen your connection with the divine on this Kashi & Prayagraj pilgrimage. Experience the ancient spiritual rituals of Varanasi, take a holy dip in the Triveni Sangam at Prayagraj, and wander through Kashi's sacred temples with completely hassle-free private arrangements.",
        whatsInside: [
            { icon: "hotel", title: "Heritage Ghat Hotel" },
            { icon: "meal", title: "Daily Veg Breakfast" },
            { icon: "transport", title: "Private AC Car" },
            { icon: "activity", title: "VIP Sugam Darshan Pass" }
        ],
        knowBeforeYouGo: [
            "Sattvik pure-vegetarian food is served.",
            "Dress conservatively when visiting temples.",
            "Boats are private and include life jackets.",
            "VIP Pass requires identity proof submission."
        ],
        stayInfo: {
            hotelName: "Alka Heritage Hotel / Hotel Radisson",
            hotelCategory: "premium",
            roomType: "Ganga View Deluxe Room",
            mealPlan: "half-board",
            location: "Varanasi & Prayagraj",
            image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
        },
        itinerary: [
            { day: 1, title: "Kashi Arrival & Ganga Aarti", description: "Arrive in Varanasi. In the evening, witness the divine Ganga Aarti on a private boat.", stay: "Heritage Ghat Hotel", meals: ["Dinner"] },
            { day: 2, title: "Kashi Vishwanath & Temple Tour", description: "Early morning Kashi Vishwanath Sugam Darshan, followed by Kaal Bhairav and Durga Kund temples.", stay: "Heritage Ghat Hotel", meals: ["Breakfast"] },
            { day: 3, title: "Prayagraj Triveni Sangam Day Trip", description: "Drive to Prayagraj. Visit Triveni Sangam (confluence of Ganga, Yamuna, Saraswati) for holy bath, and explore Akbar Fort.", stay: "Prayagraj Premium Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Subah-e-Banaras & Sarnath", description: "Experience morning sunrise boat ride with classical music, then visit Sarnath Buddhist relics.", stay: "Heritage Ghat Hotel", meals: ["Breakfast"] },
            { day: 5, title: "Depart Varanasi", description: "Leisure morning shopping for Banarasi silk sarees, then transfer to Varanasi Airport/Station.", meals: ["Breakfast"] }
        ],
        inclusions: ["Heritage Stay", "Private Boat", "Sugam Darshan ticket", "AC Vehicle"],
        exclusions: ["Flight/Train tickets", "Pooja/Dakshina fees", "Guide tips"],
        policies: { cancellation: "Free cancellation 7 days before trip.", refund: "Processed within 5 days." },
        reviews: [
            {
                id: "r1",
                author: "Ananya Mishra",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
                rating: 5,
                date: "May 2026",
                content: "Subah-e-Banaras boat ride was surreal. Hearing classical flute while the sun rises over Ganga is an experience I will never forget.",
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
            "https://images.pexels.com/photos/11948660/pexels-photo-11948660.jpeg", // Mountains
            "https://images.pexels.com/photos/37872066/pexels-photo-37872066.jpeg", // Hiking
            "https://images.pexels.com/photos/37764822/pexels-photo-37764822.jpeg", // Camping
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
        stayInfo: {
            hotelName: "Zostel Manali & Riverside Alpine Camps",
            hotelCategory: "comfort",
            roomType: "Cozy Dorm / Deluxe Dome Tent",
            mealPlan: "breakfast-only",
            location: "Manali & Solang Valley",
            image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
        },
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
    },
    {
        id: "5",
        slug: "jyotirlinga-darshan-maha-yatra",
        title: "12 Jyotirlinga Darshan: Ultimate Shiva Pilgrimage",
        price: 85500,
        originalPrice: 95000,
        discount: 10,
        reservePrice: 5000,
        badge: "Shiva Maha Yatra",
        nights: 15,
        route: ["Somnath (1N)", "Dwarka (1N)", "Ujjain (2N)", "Omkareshwar (1N)", "Kedarnath (2N)", "Nashik (2N)", "Aurangabad (1N)", "Deoghar (1N)", "Srisailam (1N)", "Madurai (1N)", "Rameswaram (2N)"],
        duration: "16 Days & 15 Nights",
        location: "jyotirlinga-shiva",
        rating: 5.0,
        reviewsCount: 45,
        targetAudience: ["Devotees", "Families", "Senior Citizens"],
        tripPace: "Active",
        startCity: "Mumbai",
        endCity: "Chennai",
        bestTimeToVisit: "October to March",
        hotelQuality: "Premium Spiritual Retreats & Hotels",
        transportQuality: "Private AC Vehicles & Flight transfers",
        images: [
            "https://images.pexels.com/photos/36834752/pexels-photo-36834752.jpeg",
            "https://images.pexels.com/photos/37209832/pexels-photo-37209832.jpeg",
            "https://images.pexels.com/photos/18290864/pexels-photo-18290864.jpeg"
        ],
        highlights: [
            "Complete 12 Jyotirlinga temples VIP Darshan",
            "Bhasma Aarti at Mahakaleshwar Ujjain",
            "Holy bath at Rameshwaram sea & 22 Teerthams",
            "Helicopter Yatra assistance for Kedarnath",
            "Special Rudrabhishek Pujas booked in advance"
        ],
        overview: "A once-in-a-lifetime Maha Yatra taking you to all 12 sacred Jyotirlingas of Lord Shiva across India. Experience profound spiritual energy, ancient rituals, and absolute devotion with meticulously organized VIP entries, flight transfers, and comfortable stays.",
        whatsInside: [
            { icon: "hotel", title: "Premium Yatri Stays" },
            { icon: "meal", title: "Sattvik Pure Veg Meals" },
            { icon: "transport", title: "All Private Transfers" },
            { icon: "activity", title: "VIP Abhishek Passes" }
        ],
        knowBeforeYouGo: [
            "Requires moderate physical fitness due to travel across multiple states.",
            "Carry traditional attire (Dhoti/Saree) for Abhishek Pujas.",
            "Helicopter for Kedarnath is subject to weather conditions.",
            "Only pure vegetarian (Sattvik) food is included."
        ],
        stayInfo: {
            hotelName: "Premium Spiritual Retreats & Devasthanam Cottages",
            hotelCategory: "premium",
            roomType: "Premium AC Double Room",
            mealPlan: "half-board",
            location: "Pan-India Sacred Shrines",
            image: "https://images.pexels.com/photos/5764095/pexels-photo-5764095.jpeg"
        },
        itinerary: [
            { day: 1, title: "Somnath Arrival & Darshan", description: "Arrive in Rajkot, drive to Somnath. Attend evening light and sound show at Somnath temple.", stay: "Somnath Beach Resort", meals: ["Dinner"] },
            { day: 2, title: "Nageshwar & Dwarka", description: "Drive to Dwarka. Darshan at Nageshwar Jyotirlinga and Dwarkadhish temple.", stay: "Dwarka Premium Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Ujjain Mahakaleshwar", description: "Fly from Rajkot to Indore, transfer to Ujjain. Evening Kaal Bhairav temple visit.", stay: "Ujjain Heritage Hotel", meals: ["Breakfast"] },
            { day: 4, title: "Bhasma Aarti & Omkareshwar", description: "Attend Ujjain Mahakaleshwar early morning Bhasma Aarti, then drive to Omkareshwar.", stay: "Omkareshwar Yatri Niwas", meals: ["Breakfast", "Dinner"] },
            { day: 5, title: "Omkareshwar & Fly to Delhi", description: "Morning boat ride & darshan at Omkareshwar Jyotirlinga, then drive to Indore airport for flight to Delhi.", stay: "Delhi Transit Hotel", meals: ["Breakfast"] },
            { day: 6, title: "Delhi to Kedarnath Base", description: "Drive/fly to Dehradun and transfer to Guptkashi/Sonprayag.", stay: "Sonprayag Yatri Lodge", meals: ["Breakfast", "Dinner"] },
            { day: 7, title: "Kedarnath Jyotirlinga Yatra", description: "Trek or take helicopter to Kedarnath Temple. Join evening Aarti.", stay: "Kedarnath Temple Area Cottage", meals: ["Breakfast", "Dinner"] },
            { day: 8, title: "Kedarnath Descent to Rishikesh", description: "Perform morning puja, descend to base and drive to Rishikesh to rest.", stay: "Rishikesh Ganga View Resort", meals: ["Breakfast"] },
            { day: 9, title: "Fly to Pune & Bhimashankar", description: "Fly from Dehradun to Pune. Drive to Bhimashankar for evening darshan.", stay: "Bhimashankar Forest Resort", meals: ["Breakfast", "Dinner"] },
            { day: 10, title: "Bhimashankar to Trimbakeshwar", description: "Drive to Nashik/Trimbakeshwar. Visit Panchavati area.", stay: "Nashik Premium Hotel", meals: ["Breakfast"] },
            { day: 11, title: "Trimbakeshwar & Grishneshwar", description: "Perform Trimbakeshwar Abhishek, then drive to Aurangabad (Grishneshwar & Ellora caves).", stay: "Aurangabad Luxury Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 12, title: "Deoghar Baidyanath Dham", description: "Fly to Patna/Deoghar. Attend Baidyanath Jyotirlinga darshan.", stay: "Deoghar Yatra Mandir", meals: ["Breakfast", "Dinner"] },
            { day: 13, title: "Baidyanath to Srisailam Mallikarjuna", description: "Fly to Hyderabad, drive to Srisailam Hills.", stay: "Srisailam Devasthanam Cottage", meals: ["Breakfast", "Dinner"] },
            { day: 14, title: "Mallikarjuna to Rameswaram", description: "Darshan at Mallikarjuna, drive back to Hyderabad for flight to Madurai, transfer to Rameswaram.", stay: "Rameswaram Temple View Hotel", meals: ["Breakfast"] },
            { day: 15, title: "Rameswaram Sea Bath & Darshan", description: "Take holy dip in 22 Teerthams, perform Ramanathaswamy puja, and visit Dhanushkodi.", stay: "Rameswaram Temple View Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 16, title: "Madurai Meenakshi & Depart", description: "Drive to Madurai. Visit Meenakshi Amman Temple, transfer to airport/station for departure.", meals: ["Breakfast"] }
        ],
        inclusions: ["All domestic flights & train tickets", "VVIP Darshan Passes", "Pure Veg meals", "Airport transfers"],
        exclusions: ["Dakshina / Puja materials", "Helicopter ticket fare (booked on request)", "Laundry & personal tipping"],
        policies: { cancellation: "Non-refundable within 15 days.", refund: "Processed in 10 working days." },
        reviews: [
            {
                id: "r1",
                author: "Suresh K. Nair",
                rating: 5,
                date: "March 2026",
                content: "Beautifully organized. Doing all 12 Jyotirlingas in 16 days was exhausting but the hotels and vehicles made it very smooth. Worth every rupee."
            }
        ]
    },
    {
        id: "6",
        slug: "devi-shaktipeeth-circuit-yatra",
        title: "Devi Shaktipeeth Circuit: Sacred Feminine Energy Tour",
        price: 38500,
        originalPrice: 42000,
        discount: 8,
        reservePrice: 2000,
        badge: "Shakti Circuit",
        nights: 9,
        route: ["Guwahati (3N)", "Kolkata (3N)", "Bhubaneswar (1N)", "Puri (2N)"],
        duration: "10 Days & 9 Nights",
        location: "devi-shaktipeeth",
        rating: 4.8,
        reviewsCount: 30,
        targetAudience: ["Devotees", "Families", "Women groups"],
        tripPace: "Moderate",
        startCity: "Guwahati",
        endCity: "Bhubaneswar",
        bestTimeToVisit: "September to March",
        hotelQuality: "Premium 3-Star Hotels near Shrines",
        transportQuality: "Private AC Sedan / Innova",
        images: [
            "https://images.pexels.com/photos/35536244/pexels-photo-35536244.jpeg",
            "https://images.pexels.com/photos/37298953/pexels-photo-37298953.jpeg",
            "https://images.pexels.com/photos/15554149/pexels-photo-15554149.jpeg",
            "https://images.pexels.com/photos/38312877/pexels-photo-38312877.jpeg"
        ],
        highlights: [
            "VIP Kamakhya Temple Darshan in Guwahati",
            "Kalighat & Dakshineswar Kali Mandir in Kolkata",
            "Special Chandi Havan & Puja ceremonies",
            "Visit Taratarini Shaktipeeth in Odisha",
            "Daily spiritual discourse with local pandits"
        ],
        overview: "A transformative journey through the sacred hubs of divine feminine energy. Worship the Adi Shakti at Kamakhya (Guwahati), Kalighat (Kolkata), and Taratarini (Odisha) with expert guided pujas, VIP access, and comfortable private arrangements.",
        whatsInside: [
            { icon: "hotel", title: "Comfortable Cozy Stays" },
            { icon: "meal", title: "Daily Veg Meals" },
            { icon: "transport", title: "Private AC Cab" },
            { icon: "activity", title: "Special Havan Booking" }
        ],
        knowBeforeYouGo: [
            "Please wear traditional attire during Pujas.",
            "Kamakhya temple has long queues; VIP pass is highly recommended.",
            "Only vegetarian food is served throughout the yatra."
        ],
        stayInfo: {
            hotelName: "Hotel Kiranshree Portico & The Peerless Inn",
            hotelCategory: "comfort",
            roomType: "Executive Room",
            mealPlan: "breakfast-only",
            location: "Guwahati, Kolkata, Puri",
            image: "https://images.pexels.com/photos/1645957/pexels-photo-1645957.jpeg"
        },
        itinerary: [
            { day: 1, title: "Guwahati Arrival", description: "Arrive at Guwahati airport. Check-in to hotel. Evening Brahmaputra river cruise.", stay: "Guwahati Luxury Hotel", meals: ["Dinner"] },
            { day: 2, title: "Kamakhya Devi Darshan", description: "Early morning VIP Kamakhya Darshan. Visit Umananda temple on river island.", stay: "Guwahati Luxury Hotel", meals: ["Breakfast"] },
            { day: 3, title: "Hajo Pilgrimage", description: "Day trip to Hajo, visiting Hayagriva Madhava temple and local shrines.", stay: "Guwahati Luxury Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Guwahati to Kolkata", description: "Fly to Kolkata. Check-in to hotel. Evening free for shopping or leisure.", stay: "Kolkata Heritage Hotel", meals: ["Breakfast"] },
            { day: 5, title: "Kolkata Kali Temple Tour", description: "Darshan at Kalighat Kali temple and Dakshineswar Kali temple. Visit Belur Math.", stay: "Kolkata Heritage Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 6, title: "Adyapith & Tarapith", description: "Full day spiritual visit to Adyapith Mandir and traditional prayer rooms.", stay: "Kolkata Heritage Hotel", meals: ["Breakfast"] },
            { day: 7, title: "Kolkata to Bhubaneswar", description: "Fly to Bhubaneswar. Visit Lingaraj Temple and Mukteshvara Temple.", stay: "Bhubaneswar Premium Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 8, title: "Taratarini Shaktipeeth", description: "Drive to Taratarini Temple hill shrine. Perform special puja, drive to Puri.", stay: "Puri Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 9, title: "Puri & Konark Temple", description: "Morning Jagannath Puri temple darshan. Afternoon visit Konark Sun Temple.", stay: "Puri Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 10, title: "Departure", description: "Transfer to Bhubaneswar airport for onward journey.", meals: ["Breakfast"] }
        ],
        inclusions: ["Inner-line assistance", "VIP Darshan ticket", "All accommodation & internal transfers", "Vedic pandit guidance"],
        exclusions: ["Flights from Kolkata/Guwahati", "Personal offerings/dakshina", "Guide charges"],
        policies: { cancellation: "Refundable up to 10 days before tour.", refund: "Processed within 7 days." },
        reviews: [
            {
                id: "r1",
                author: "Meenakshi Dey",
                rating: 5,
                date: "April 2026",
                content: "Superb experience. Highly recommend the Kolkata and Guwahati combination. Guide was very knowledgeable about Shakti customs."
            }
        ]
    },
    {
        id: "7",
        slug: "ganga-river-divine-tour",
        title: "Maa Ganga Tour: Rishikesh, Haridwar & Kashi",
        price: 24500,
        originalPrice: 28000,
        discount: 12,
        reservePrice: 1500,
        badge: "Ganga Aarti Special",
        nights: 6,
        route: ["Rishikesh (2N)", "Haridwar (1N)", "Varanasi (3N)"],
        duration: "7 Days & 6 Nights",
        location: "ganga-river-tour",
        rating: 4.9,
        reviewsCount: 55,
        targetAudience: ["Families", "Senior Citizens", "Spiritual Seekers"],
        tripPace: "Relaxed",
        startCity: "Dehradun",
        endCity: "Varanasi",
        bestTimeToVisit: "September to April",
        hotelQuality: "Scenic Heritage Hotels overlooking River",
        transportQuality: "Private AC Sedan & Train travel",
        images: [
            "https://images.pexels.com/photos/38018854/pexels-photo-38018854.jpeg",
            "https://images.pexels.com/photos/15495237/pexels-photo-15495237.jpeg",
            "https://images.pexels.com/photos/13473095/pexels-photo-13473095.jpeg"
        ],
        highlights: [
            "Reserved seating for Ganga Aarti at Har Ki Pauri Haridwar",
            "Parmarth Niketan Ashram Ganga Aarti in Rishikesh",
            "Dashashwamedh Ghat Aarti from private boat in Kashi",
            "Yoga and meditation sessions at Sunrise",
            "Kashi Vishwanath Corridor VIP Sugam Darshan"
        ],
        overview: "Follow the divine flow of holy river Ganges. Start in the serene Himalayan foothills of Rishikesh & Haridwar and travel to the ancient spiritual heart of Varanasi. Immerse yourself in daily Ganga Aartis, temple rituals, and riverside meditation.",
        whatsInside: [
            { icon: "hotel", title: "Riverfront Stays" },
            { icon: "meal", title: "Vegetarian Meals" },
            { icon: "transport", title: "AC Sedan Transfers" },
            { icon: "activity", title: "Private Boat Ride" }
        ],
        knowBeforeYouGo: [
            "Alcohol and non-vegetarian food are strictly prohibited in all three cities.",
            "Carry cotton clothes for summer and light woollens for winter.",
            "VIP Darshan pass requires ID proofs in advance."
        ],
        stayInfo: {
            hotelName: "Aloha On The Ganges & Brij Rama Palace",
            hotelCategory: "luxury",
            roomType: "Ganga View Suite",
            mealPlan: "half-board",
            location: "Rishikesh, Haridwar & Varanasi",
            image: "https://images.pexels.com/photos/2034330/pexels-photo-2034330.jpeg"
        },
        itinerary: [
            { day: 1, title: "Rishikesh Arrival & Ashram visit", description: "Arrive at Dehradun, transfer to Rishikesh. Evening witness Parmarth Niketan Ganga Aarti.", stay: "Rishikesh Ganga Resort", meals: ["Dinner"] },
            { day: 2, title: "Beatles Ashram & Yoga Session", description: "Morning yoga session. Afternoon visit Beatles Ashram and Neer Garh waterfall.", stay: "Rishikesh Ganga Resort", meals: ["Breakfast"] },
            { day: 3, title: "Haridwar & Har Ki Pauri Aarti", description: "Drive to Haridwar. Visit Mansa Devi and Chandi Devi temples. Evening attend reserved Ganga Aarti at Har Ki Pauri.", stay: "Haridwar Heritage Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Haridwar to Varanasi Train", description: "Board day/overnight train from Haridwar to Varanasi. Relax at hotel.", stay: "Varanasi Ghat Hotel", meals: ["Breakfast"] },
            { day: 5, title: "Kashi Vishwanath & Evening Aarti", description: "VIP Sugam Darshan at Kashi Vishwanath, Kaal Bhairav, and Annapurna temples. Evening Ganga Aarti on private boat.", stay: "Varanasi Ghat Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 6, title: "Subah-e-Banaras & Sarnath", description: "Sunrise boat ride with classical music, walk through Banarasi silk weaver lanes, afternoon visit Sarnath.", stay: "Varanasi Ghat Hotel", meals: ["Breakfast"] },
            { day: 7, title: "Departure", description: "Leisure morning, transfer to Varanasi Airport/Station for onward journey.", meals: ["Breakfast"] }
        ],
        inclusions: ["River view hotel rooms", "Train/Flight tickets (Haridwar-Varanasi)", "Private boat ride", "VIP Darshan ticket"],
        exclusions: ["Personal pooja costs", "Guide charges", "Tipping"],
        policies: { cancellation: "Refundable up to 7 days before tour.", refund: "Processed within 5 days." },
        reviews: [
            {
                id: "r1",
                author: "Devendra Patel",
                rating: 5,
                date: "January 2026",
                content: "Very peaceful. The boat ride in Varanasi and the reserved seating in Haridwar made a huge difference for my elderly parents."
            }
        ]
    },
    {
        id: "8",
        slug: "spiritual-south-india-tour",
        title: "Spiritual South India: Rameswaram, Madurai, Hampi & Tanjore",
        price: 32500,
        originalPrice: 36000,
        discount: 9,
        reservePrice: 2000,
        badge: "Architectural Marvels",
        nights: 8,
        route: ["Bangalore (1N)", "Hampi (2N)", "Tanjore (1N)", "Madurai (2N)", "Rameswaram (2N)"],
        duration: "9 Days & 8 Nights",
        location: "spiritual-south-india",
        rating: 4.9,
        reviewsCount: 42,
        targetAudience: ["History Buffs", "Families", "Pilgrims"],
        tripPace: "Active",
        startCity: "Bangalore",
        endCity: "Madurai",
        bestTimeToVisit: "October to March",
        hotelQuality: "Premium Heritage Hotels & Resorts",
        transportQuality: "AC Innova Private Cab",
        images: [
            "https://images.pexels.com/photos/36035106/pexels-photo-36035106.jpeg",
            "https://images.pexels.com/photos/37862812/pexels-photo-37862812.jpeg"
        ],
        highlights: [
            "Worship at Ramanathaswamy Temple Rameswaram & bath in 22 Teerthams",
            "VIP Darshan at Madurai Meenakshi Amman Temple",
            "Visit Brihadeeswarar Temple (Big Temple) Tanjore",
            "Explore Virupaksha Temple & stone ruins of Hampi",
            "Traditional Tamil Nadu temple meals served on banana leaf"
        ],
        overview: "Discover the spectacular gopurams, ancient oceanfront shrines, and architectural wonders of South India. This meticulously planned tour takes you from the ruins of Hampi to the holy island of Rameswaram.",
        whatsInside: [
            { icon: "hotel", title: "Premium Heritage Hotel" },
            { icon: "meal", title: "Breakfast & Dinner" },
            { icon: "transport", title: "AC Private Innova" },
            { icon: "activity", title: "Temple Guide Included" }
        ],
        knowBeforeYouGo: [
            "Strict dress code at South Indian temples (Mundu/Veshti for men, Saree/Salwar for women).",
            "Mobile phones are not allowed inside Ramanathaswamy and Meenakshi temples.",
            "Walking on stone corridors requires bare feet; socks are recommended."
        ],
        stayInfo: {
            hotelName: "Heritage Resort Hampi & Gateway Hotel Madurai",
            hotelCategory: "premium",
            roomType: "Heritage Villa / Deluxe Room",
            mealPlan: "breakfast-only",
            location: "Hampi, Tanjore, Madurai, Rameswaram",
            image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
        },
        itinerary: [
            { day: 1, title: "Bangalore Arrival", description: "Arrive at Bangalore, check-in to hotel. Visit ISKCON temple in the evening.", stay: "Bangalore Premium Hotel", meals: ["Dinner"] },
            { day: 2, title: "Bangalore to Hampi", description: "Drive to Hampi. Check-in to resort, relax and enjoy the sunset over Tungabhadra river.", stay: "Hampi Heritage Resort", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Hampi Ruins Exploration", description: "Guided tour of Virupaksha Temple, Stone Chariot, Vittala Temple, and King's Balance.", stay: "Hampi Heritage Resort", meals: ["Breakfast"] },
            { day: 4, title: "Hampi to Tanjore", description: "Scenic drive or train to Tanjore (Thanjavur). Check-in to hotel.", stay: "Tanjore Boutique Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 5, title: "Tanjore Big Temple to Madurai", description: "Visit Brihadeeswarar Temple (UNESCO Heritage site), drive to Madurai.", stay: "Madurai Heritage Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 6, title: "Madurai Meenakshi Temple", description: "VIP Darshan at Meenakshi Amman Temple. Visit Thirumalai Nayakkar Palace.", stay: "Madurai Heritage Hotel", meals: ["Breakfast"] },
            { day: 7, title: "Madurai to Rameswaram", description: "Drive across Pamban Bridge to Rameswaram island. Visit Dhanushkodi ghost town.", stay: "Rameswaram Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 8, title: "Rameswaram Holy Bath & Darshan", description: "Early morning bath in 22 sacred Teerthams, Ramanathaswamy Temple darshan, and spiritual discourses.", stay: "Rameswaram Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 9, title: "Madurai Depart", description: "Drive back to Madurai airport/station for departure.", meals: ["Breakfast"] }
        ],
        inclusions: ["All monument & temple entry fees", "English speaking local guides", "Traditional banana leaf lunch", "AC private Innova"],
        exclusions: ["Pooja charges", "Personal tipping", "Helicopter transfers"],
        policies: { cancellation: "Refundable up to 14 days before tour.", refund: "Processed within 7 days." },
        reviews: [
            {
                id: "r1",
                author: "K. R. Subramanian",
                rating: 5,
                date: "February 2026",
                content: "Superb arrangements. The driver was extremely polite and knew all the temple timings perfectly. Rameswaram bath was very spiritual."
            }
        ]
    },
    {
        id: "9",
        slug: "pashupatinath-nepal-divine-darshan",
        title: "Pashupatinath Temple & Kathmandu Divine Darshan",
        price: 29500,
        originalPrice: 33000,
        discount: 10,
        reservePrice: 1500,
        badge: "Nepal Pilgrimage",
        nights: 4,
        route: ["Kathmandu (3N)", "Nagarkot (1N)"],
        duration: "5 Days & 4 Nights",
        location: "pashupatinath",
        rating: 4.8,
        reviewsCount: 38,
        targetAudience: ["Devotees", "Families", "Couples"],
        tripPace: "Relaxed",
        startCity: "Kathmandu",
        endCity: "Kathmandu",
        bestTimeToVisit: "September to May",
        hotelQuality: "Premium 4-Star Hotels with Mountain Views",
        transportQuality: "Private AC SUV/Cab",
        images: [
            "https://images.pexels.com/photos/13746894/pexels-photo-13746894.jpeg",
            "https://images.pexels.com/photos/16793615/pexels-photo-16793615.jpeg",
            "https://images.pexels.com/photos/38558923/pexels-photo-38558923.jpeg",
            "https://images.pexels.com/photos/36109454/pexels-photo-36109454.jpeg"
        ],
        highlights: [
            "Exclusive VIP Darshan at Pashupatinath Temple",
            "Attend Bagmati River evening Ganga Aarti",
            "Visit Guheshwari Shaktipeeth Temple",
            "Explore Kathmandu Durbar Square and Swayambhunath",
            "Breathtaking Sunrise view of Himalayas from Nagarkot"
        ],
        overview: "Experience the profound divine energy of Nepal with our Pashupatinath Yatra. Seek blessings at the holiest Shiva temple in Kathmandu, visit ancient heritage sites, and absorb the peaceful Himalayan ambience.",
        whatsInside: [
            { icon: "hotel", title: "Premium 4-Star Hotel" },
            { icon: "meal", title: "Daily Breakfast & Dinner" },
            { icon: "transport", title: "Private SUV Transfers" },
            { icon: "activity", title: "Kathmandu Guided Tour" }
        ],
        knowBeforeYouGo: [
            "Only Hindus are allowed inside the main courtyard of Pashupatinath temple.",
            "Carry a valid Passport or Indian Voter ID card for immigration.",
            "Nepalese currency is easily exchangeable; Indian ₹100/₹500 notes are widely accepted."
        ],
        stayInfo: {
            hotelName: "Hotel Yak & Yeti / Club Himalaya Nagarkot",
            hotelCategory: "premium",
            roomType: "Deluxe Mountain View Room",
            mealPlan: "half-board",
            location: "Kathmandu & Nagarkot, Nepal",
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
        },
        itinerary: [
            { day: 1, title: "Kathmandu Arrival", description: "Arrive at Kathmandu Tribhuvan Airport. Meet representative, check-in to hotel. Evening free to explore Thamel.", stay: "Kathmandu 4-Star Hotel", meals: ["Dinner"] },
            { day: 2, title: "Pashupatinath Darshan & Aarti", description: "Morning VIP Darshan at Pashupatinath temple. Visit Guheshwari Shaktipeeth. Attend evening Ganga Aarti on Bagmati river banks.", stay: "Kathmandu 4-Star Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Kathmandu Sightseeing", description: "Guided tour of Swayambhunath (Monkey Temple), Boudhanath Stupa, and Bhaktapur Durbar Square.", stay: "Kathmandu 4-Star Hotel", meals: ["Breakfast"] },
            { day: 4, title: "Kathmandu to Nagarkot", description: "Drive to Nagarkot hill station. Enjoy panoramic views of the Himalayas and beautiful sunset.", stay: "Nagarkot Hill Resort", meals: ["Breakfast", "Dinner"] },
            { day: 5, title: "Nagarkot Sunrise & Depart", description: "Early morning sunrise view over Mt. Everest range. Drive back to Kathmandu Airport for flight home.", meals: ["Breakfast"] }
        ],
        inclusions: ["All airport transfers & sightseeing", "VIP Darshan pass", "Heritage entry fees", "Local guide services"],
        exclusions: ["International flights", "Personal travel insurance", "Pooja expenses"],
        policies: { cancellation: "Refundable up to 7 days before yatra.", refund: "Processed within 7 days." },
        reviews: [
            {
                id: "r1",
                author: "Rajesh Kumar",
                rating: 5,
                date: "October 2025",
                content: "Very well managed. Pashupatinath temple has a very powerful aura. The hotel in Nagarkot had stunning views of snow peaks."
            }
        ]
    },
    {
        id: "10",
        slug: "jagannath-puri-dham-yatra",
        title: "Puri Dham Yatra: Jagannath Puri & Konark Sun Temple",
        price: 14500,
        originalPrice: 17000,
        discount: 14,
        reservePrice: 1000,
        badge: "Char Dham Yatra",
        nights: 3,
        route: ["Bhubaneswar (1N)", "Puri (2N)"],
        duration: "4 Days & 3 Nights",
        location: "jagannath-puri",
        rating: 4.9,
        reviewsCount: 48,
        targetAudience: ["Families", "Senior Citizens", "Solo Travelers"],
        tripPace: "Relaxed",
        startCity: "Bhubaneswar",
        endCity: "Bhubaneswar",
        bestTimeToVisit: "October to March",
        hotelQuality: "Premium Beachside Resorts in Puri",
        transportQuality: "Private AC Cab",
        images: [
            "https://images.pexels.com/photos/32760435/pexels-photo-32760435.jpeg",
            "https://images.pexels.com/photos/19843355/pexels-photo-19843355.jpeg",
            "https://images.pexels.com/photos/19843349/pexels-photo-19843349.jpeg"
        ],
        highlights: [
            "VIP Darshan at Shri Jagannath Temple in Puri",
            "Taste the legendary Mahaprasad (cooked in clay pots)",
            "Explore Konark Sun Temple (UNESCO Site)",
            "Boat cruise in Chilika Lake to spot Irrawaddy Dolphins",
            "Visit Lingaraj and Mukteshvara temples in Bhubaneswar"
        ],
        overview: "Set out on the holy Puri Dham pilgrimage, one of the crucial Char Dhams. Seek blessings of Lord Jagannath, stand in awe of the architectural genius of the Konark Sun Temple, and enjoy the golden beaches of Puri.",
        whatsInside: [
            { icon: "hotel", title: "Beachfront Resort Stay" },
            { icon: "meal", title: "Daily Veg Breakfast" },
            { icon: "transport", title: "AC Sedan Transfers" },
            { icon: "activity", title: "Mahaprasad Feast" }
        ],
        knowBeforeYouGo: [
            "Leather items (wallets, belts) and mobile phones are strictly prohibited inside Jagannath Temple.",
            "Only orthodox Hindus are permitted inside the main temple premises.",
            "Chilika Lake boat ride is subject to weather conditions."
        ],
        stayInfo: {
            hotelName: "Mayfair Waves Beach Resort Puri",
            hotelCategory: "luxury",
            roomType: "Ocean View Premium Room",
            mealPlan: "half-board",
            location: "Puri Beach Front",
            image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
        },
        itinerary: [
            { day: 1, title: "Bhubaneswar Arrival", description: "Arrive at Bhubaneswar, visit Lingaraj temple and Udayagiri caves. Check-in to hotel.", stay: "Bhubaneswar Premium Hotel", meals: ["Dinner"] },
            { day: 2, title: "Bhubaneswar to Puri & Aarti", description: "Drive to Puri. Visit Pipli applique village en route. Check-in to beach resort. Attend evening Darshan at Jagannath Temple.", stay: "Puri Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Konark Sun Temple & Chilika Lake", description: "Morning visit Konark Sun Temple. Afternoon boat ride in Chilika Lake (Satapada) to see dolphins, return to Puri beach.", stay: "Puri Beach Resort", meals: ["Breakfast"] },
            { day: 4, title: "Mahaprasad & Departure", description: "Perform morning temple rituals, collect Mahaprasad, and drive to Bhubaneswar airport for departure.", meals: ["Breakfast"] }
        ],
        inclusions: ["Puri beach resort stay", "VIP Darshan tickets", "Special Mahaprasad lunch", "Private AC Cab"],
        exclusions: ["Flight/Train tickets", "Pooja offerings", "Guide tipping"],
        policies: { cancellation: "Free cancellation 7 days before Yatra.", refund: "Processed within 5 days." },
        reviews: [
            {
                id: "r1",
                author: "Siddharth Patnaik",
                rating: 5,
                date: "November 2025",
                content: "Very neat arrangements. The beachfront hotel in Puri was clean and close to the temple. The Mahaprasad was delicious."
            }
        ]
    },
    {
        id: "11",
        slug: "khatu-shyam-salasar-balaji-yatra",
        title: "Khatu Shyam Ji, Salasar Balaji & Jeen Mata Yatra",
        price: 12500,
        originalPrice: 15000,
        discount: 16,
        reservePrice: 500,
        badge: "Rajasthan Pilgrimage",
        nights: 3,
        route: ["Jaipur (1N)", "Khatu Shyam (1N)", "Salasar (1N)"],
        duration: "4 Days & 3 Nights",
        location: "khatu-shyam",
        rating: 4.9,
        reviewsCount: 52,
        targetAudience: ["Devotees", "Families", "Youth groups"],
        tripPace: "Moderate",
        startCity: "Jaipur",
        endCity: "Jaipur",
        bestTimeToVisit: "October to March",
        hotelQuality: "Premium Heritage Havelis & Hotels",
        transportQuality: "Private AC Cab",
        images: [
            "https://images.pexels.com/photos/13253313/pexels-photo-13253313.jpeg",
            "https://images.unsplash.com/photo-1609137144813-7d72110c71a3?auto=compress&cs=tinysrgb&w=1600"
        ],
        highlights: [
            "Divine Darshan at Khatu Shyam Ji Temple (Lord of Kalyuga)",
            "Visit Salasar Balaji Hanuman Temple (Bearded Hanuman Ji)",
            "Holy bath at Shyam Kund in Khatu Shyam",
            "Hilltop temple hike to Jeen Mata Mandir",
            "Traditional Rajasthani Dal-Baati-Churma dinner"
        ],
        overview: "A highly popular devotional tour covering the powerful shrines of Shekhawati region. Seek blessings of Khatu Shyam Ji, Salasar Balaji, and Jeen Mata with completely managed transport and comfortable haveli stays.",
        whatsInside: [
            { icon: "hotel", title: "Heritage Haveli Stay" },
            { icon: "meal", title: "Breakfast & Dinner" },
            { icon: "transport", title: "Private AC Cab" },
            { icon: "activity", title: "Rajasthani Feast" }
        ],
        knowBeforeYouGo: [
            "Very heavy rush on Ekadashi and weekends; expect queue waiting times.",
            "Carry light woollens if traveling between November and February.",
            "Only pure vegetarian meals are served."
        ],
        stayInfo: {
            hotelName: "Radhey Ki Haveli Khatu & Salasar Yatri Nivas",
            hotelCategory: "comfort",
            roomType: "Traditional Deluxe Room",
            mealPlan: "half-board",
            location: "Khatu & Salasar Shekhawati",
            image: "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg"
        },
        itinerary: [
            { day: 1, title: "Jaipur Arrival", description: "Arrive at Jaipur. Sightseeing of Govind Dev Ji Temple and Hawa Mahal. Check-in to heritage hotel.", stay: "Jaipur Heritage Haveli", meals: ["Dinner"] },
            { day: 2, title: "Jaipur to Khatu Shyam Ji", description: "Drive to Khatu. Take holy bath in Shyam Kund, seek darshan of Khatu Shyam Ji temple. Witness evening Aarti.", stay: "Khatu Dharamshala Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Salasar Balaji & Jeen Mata", description: "Visit Jeen Mata temple on hill, drive to Salasar Balaji. Darshan at Salasar Balaji Hanuman temple.", stay: "Salasar Yatri Lodge", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Salasar to Jaipur Depart", description: "Morning prayers, check-out and drive back to Jaipur airport/station for departure.", meals: ["Breakfast"] }
        ],
        inclusions: ["AC Cab for entire trip", "Comfortable Haveli stays", "Traditional Rajasthani meals", "Darshan queue assistance"],
        exclusions: ["Personal donations/dakshina", "Guide charges", "Laundry"],
        policies: { cancellation: "Refundable up to 5 days before yatra.", refund: "Processed within 3 days." },
        reviews: [
            {
                id: "r1",
                author: "Vikram Singhal",
                rating: 5,
                date: "December 2025",
                content: "Very satisfied. The haveli stays were beautiful. Our driver helped us beat the queue by reaching early morning. Jai Shree Shyam."
            }
        ]
    },
    {
        id: "12",
        slug: "baps-robbinsville-akshardham-yatra",
        title: "Akshardham Darshan: Robbinsville Swaminarayan Mandir Yatra",
        price: 98000,
        originalPrice: 110000,
        discount: 10,
        reservePrice: 10000,
        badge: "USA Akshardham Special",
        nights: 5,
        route: ["New York (2N)", "Robbinsville (2N)", "Princeton (1N)"],
        duration: "6 Days & 5 Nights",
        location: "baps-robbinsville",
        rating: 5.0,
        reviewsCount: 15,
        targetAudience: ["NRI Families", "Devotees", "Sightseers"],
        tripPace: "Moderate",
        startCity: "New York (JFK)",
        endCity: "New York (JFK)",
        bestTimeToVisit: "April to October",
        hotelQuality: "Premium 4-Star Brand Hotels",
        transportQuality: "Private AC Minivan / Coach",
        images: [
            "https://images.pexels.com/photos/36885032/pexels-photo-36885032.jpeg",
            "https://images.pexels.com/photos/4533747/pexels-photo-4533747.jpeg"
        ],
        highlights: [
            "Full day Akshardham Mahamandir tour in Robbinsville NJ",
            "Participate in sacred Abhishek rituals",
            "Spectacular light & water show (Nilkanth Kalyan)",
            "Princeton University & historic town tour",
            "New York City sightseeing (Times Square, Statue of Liberty)"
        ],
        overview: "Worship at the largest Hindu temple in the Western hemisphere. Explore the majestic hand-carved BAPS Swaminarayan Akshardham in Robbinsville, New Jersey, combined with premium New York sightseeing and comfortable stays.",
        whatsInside: [
            { icon: "hotel", title: "Premium 4-Star Stay" },
            { icon: "meal", title: "Veg Breakfast & Dinner" },
            { icon: "transport", title: "Private AC Minivan" },
            { icon: "activity", title: "Akshardham VIP Tour" }
        ],
        knowBeforeYouGo: [
            "US Visa must be obtained independently before booking.",
            "Strict dress code inside the temple (shoulders and knees must be covered).",
            "Photography is permitted in outdoor areas only."
        ],
        stayInfo: {
            hotelName: "Westin Times Square & Hilton Garden Inn Robbinsville",
            hotelCategory: "premium",
            roomType: "Standard King Room",
            mealPlan: "breakfast-only",
            location: "New York City & Robbinsville, NJ",
            image: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg"
        },
        itinerary: [
            { day: 1, title: "New York Arrival", description: "Arrive at JFK airport, transfer to Manhattan hotel. Evening walk in Times Square.", stay: "Manhattan 4-Star Hotel", meals: ["Dinner"] },
            { day: 2, title: "New York City Sightseeing", description: "Visit Statue of Liberty, Empire State Building, and Central Park.", stay: "Manhattan 4-Star Hotel", meals: ["Breakfast"] },
            { day: 3, title: "New York to Robbinsville NJ", description: "Drive to Robbinsville, New Jersey. Check-in to hotel. Evening preliminary walk in Akshardham gardens.", stay: "Robbinsville Premium Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Akshardham Full Day Tour", description: "Detailed tour of Robbinsville Swaminarayan Akshardham temple. Attend Abhishek rituals and evening water show.", stay: "Robbinsville Premium Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 5, title: "Princeton University & Shopping", description: "Visit nearby historic Princeton University campus and explore local shopping outlets.", stay: "Princeton Premium Hotel", meals: ["Breakfast"] },
            { day: 6, title: "Depart New York", description: "Drive back to JFK airport for flight home.", meals: ["Breakfast"] }
        ],
        inclusions: ["All airport transfers & transportation", "VIP Akshardham tour coordinator", "Premium hotel stays", "Nilkanth Kalyan show tickets"],
        exclusions: ["US Visa fee", "International flight tickets", "Lunch meals"],
        policies: { cancellation: "Refundable up to 30 days before trip.", refund: "Processed within 10 days." },
        reviews: [
            {
                id: "r1",
                author: "Harish Patel",
                rating: 5,
                date: "June 2026",
                content: "Akshardham Robbinsville is a wonder of the world! Hand-carved marble carvings are stunning. The tour was excellently managed."
            }
        ]
    },
    {
        id: "13",
        slug: "baps-abu-dhabi-desert-yatra",
        title: "Desert Harmony: Abu Dhabi BAPS Hindu Mandir Tour",
        price: 45000,
        originalPrice: 50000,
        discount: 10,
        reservePrice: 3000,
        badge: "Middle East Special",
        nights: 4,
        route: ["Dubai (2N)", "Abu Dhabi (2N)"],
        duration: "5 Days & 4 Nights",
        location: "baps-abu-dhabi",
        rating: 4.9,
        reviewsCount: 22,
        targetAudience: ["Families", "Couples", "Senior Citizens"],
        tripPace: "Relaxed",
        startCity: "Dubai (DXB)",
        endCity: "Abu Dhabi (AUH)",
        bestTimeToVisit: "November to March",
        hotelQuality: "Luxury 4-Star/5-Star Resorts",
        transportQuality: "Private AC Lexus / SUV",
        images: [
            "https://images.pexels.com/photos/4533747/pexels-photo-4533747.jpeg",
            "https://images.pexels.com/photos/36885028/pexels-photo-36885028.jpeg"
        ],
        highlights: [
            "Visit the historic BAPS Hindu Mandir in Abu Dhabi",
            "Guided architectural walk explaining stories of global harmony",
            "Dubai Sightseeing including Burj Khalifa & Dubai Mall",
            "Premium Desert Safari with vegetarian dinner",
            "Grand Sheikh Zayed Mosque visit"
        ],
        overview: "Witness the magnificent hand-carved pink sandstone BAPS Hindu Mandir in Abu Dhabi, UAE. This premium tour blends deep spirituality with the ultra-modern architecture and sights of Dubai and Abu Dhabi.",
        whatsInside: [
            { icon: "hotel", title: "Luxury 5-Star Stay" },
            { icon: "meal", title: "Veg Breakfast & Dinner" },
            { icon: "transport", title: "Private SUV Transfers" },
            { icon: "activity", title: "Desert Safari Tour" }
        ],
        knowBeforeYouGo: [
            "UAE Tourist Visa can be processed online in 3 working days.",
            "Conservative attire required for both BAPS Mandir and Sheikh Zayed Mosque.",
            "Only vegetarian Indian meals are included."
        ],
        stayInfo: {
            hotelName: "Grand Hyatt Dubai & Ritz Carlton Abu Dhabi",
            hotelCategory: "luxury",
            roomType: "Club Room / Garden Suite",
            mealPlan: "half-board",
            location: "Dubai & Abu Dhabi",
            image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
        },
        itinerary: [
            { day: 1, title: "Dubai Arrival", description: "Arrive at Dubai airport, transfer to luxury hotel. Evening Marina Dhow Cruise.", stay: "Dubai Marina Hotel", meals: ["Dinner"] },
            { day: 2, title: "Burj Khalifa & Desert Safari", description: "Visit Burj Khalifa top floor. Afternoon Desert Safari with dune bashing, camel rides, and vegetarian buffet dinner.", stay: "Dubai Marina Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "Dubai to Abu Dhabi & Mandir", description: "Drive to Abu Dhabi. Detailed guided visit to the BAPS Hindu Mandir. Enjoy peaceful prayers.", stay: "Abu Dhabi Beach Resort", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Sheikh Zayed Mosque & Louvre", description: "Visit the Sheikh Zayed Grand Mosque and Louvre Abu Dhabi museum.", stay: "Abu Dhabi Beach Resort", meals: ["Breakfast"] },
            { day: 5, title: "Depart Abu Dhabi", description: "Check-out and transfer to Abu Dhabi or Dubai airport for flight home.", meals: ["Breakfast"] }
        ],
        inclusions: ["Visa assistance", "Marina cruise & Desert Safari tickets", "All private transportation", "BAPS Mandir tour coordinator"],
        exclusions: ["International flights", "UAE Visa fee", "Tipping"],
        policies: { cancellation: "Refundable up to 10 days before trip.", refund: "Processed within 5 days." },
        reviews: [
            {
                id: "r1",
                author: "Amit Bhatia",
                rating: 5,
                date: "January 2026",
                content: "Proud moment to see such a magnificent Hindu Mandir in UAE. The sand carvings are fantastic. Excellent guide services."
            }
        ]
    },
    {
        id: "14",
        slug: "baps-london-neasden-mandir-yatra",
        title: "Spiritual London: Neasden Swaminarayan Mandir Tour",
        price: 78000,
        originalPrice: 85000,
        discount: 8,
        reservePrice: 8000,
        badge: "UK Mandir Special",
        nights: 4,
        route: ["London (4N)"],
        duration: "5 Days & 4 Nights",
        location: "baps-london",
        rating: 4.9,
        reviewsCount: 18,
        targetAudience: ["NRI Families", "Devotees", "Sightseers"],
        tripPace: "Relaxed",
        startCity: "London (LHR)",
        endCity: "London (LHR)",
        bestTimeToVisit: "May to September",
        hotelQuality: "Premium 4-Star London Hotels",
        transportQuality: "Private AC Minivan",
        images: [
            "https://images.pexels.com/photos/18362066/pexels-photo-18362066.jpeg",
            "https://images.pexels.com/photos/18362045/pexels-photo-18362045.jpeg"
        ],
        highlights: [
            "Detailed visit to BAPS Shri Swaminarayan Mandir in Neasden",
            "Explore 'Understanding Hinduism' exhibition inside temple",
            "Authentic Gujarati vegetarian dinner at Shayona restaurant",
            "London Hop-On Hop-Off sightseeing bus tour",
            "Scenic Thames River evening dinner cruise"
        ],
        overview: "Worship at Europe's first traditional stone Hindu temple. Explore the stunning marble and limestone Neasden Temple, combined with classic London sightseeing and premium experiences.",
        whatsInside: [
            { icon: "hotel", title: "Premium 4-Star Stay" },
            { icon: "meal", title: "Daily Veg Breakfast" },
            { icon: "transport", title: "London Bus Passes" },
            { icon: "activity", title: "Thames Cruise Tickets" }
        ],
        knowBeforeYouGo: [
            "UK Visa is required for Indian passport holders and must be applied in advance.",
            "Temples require conservative dress code.",
            "Neasden Mandir is located in North West London; private transfers are included."
        ],
        stayInfo: {
            hotelName: "Copthorne Tara Hotel London Kensington",
            hotelCategory: "premium",
            roomType: "Superior Double Room",
            mealPlan: "breakfast-only",
            location: "Central & West London, UK",
            image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
        },
        itinerary: [
            { day: 1, title: "London Arrival", description: "Arrive at Heathrow, transfer to London hotel. Evening free to explore Oxford street.", stay: "Central London 4-Star Hotel", meals: ["Dinner"] },
            { day: 2, title: "Hop-on Hop-off Bus Tour", description: "Full day London hop-on hop-off bus sightseeing, including London Eye, Big Ben, Tower Bridge.", stay: "Central London 4-Star Hotel", meals: ["Breakfast"] },
            { day: 3, title: "Neasden Temple Full Day", description: "Transfer to Neasden Mandir. Guided walk, attend noon Aarti, explore Hinduism exhibition, and dinner at Shayona.", stay: "Central London 4-Star Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Windsor Castle Day Trip", description: "Visit the historic Windsor Castle and explore beautiful gardens, return to London for Thames river cruise.", stay: "Central London 4-Star Hotel", meals: ["Breakfast"] },
            { day: 5, title: "Depart London", description: "Check-out and transfer to Heathrow airport for flight home.", meals: ["Breakfast"] }
        ],
        inclusions: ["All transfers & London bus passes", "Exhibition & cruise tickets", "BAPS Mandir coordinator", "Shayona dinner"],
        exclusions: ["UK Visa fee", "International flight tickets", "Lunch meals"],
        policies: { cancellation: "Refundable up to 21 days before trip.", refund: "Processed within 7 days." },
        reviews: [
            {
                id: "r1",
                author: "Nilesh Patel",
                rating: 5,
                date: "July 2025",
                content: "Very peaceful. The Neasden temple is incredibly beautiful. The Shayona restaurant served very delicious and authentic hot Gujarati food."
            }
        ]
    }
];
