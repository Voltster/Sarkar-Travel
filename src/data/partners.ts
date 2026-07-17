export interface Partner {
    id: string;
    slug: string;
    name: string;
    image: string; // Card image
    heroImage: string; // Detail page hero
    description: string; // Short description for card
    longDescription: string[]; // Detailed description for page (paragraphs)
    gallery: string[];
    website?: string;
    logo?: string;
}

export const partners: Partner[] = [
    {
        id: "1",
        slug: "australia",
        name: "Australia",
        image: "https://images.pexels.com/photos/2845013/pexels-photo-2845013.jpeg",
        heroImage: "https://images.pexels.com/photos/2845013/pexels-photo-2845013.jpeg",
        description: "Experience the vast outback, vibrant cities, and stunning coastlines of Australia.",
        longDescription: [
            "Australia is a land of savage beauty, big adventure, and even bigger horizons. There are good reasons why the country finds itself on so many bucket lists: the same country that gave us the Great Barrier Reef and Uluru also has world-class cosmopolitan cities like Sydney and Melbourne.",
            "Whether you're looking for a relaxing beach holiday, an adrenaline-fueled adventure, or a cultural deep-dive, Australia has something for everyone. From the tropical rainforests of the north to the rugged coastlines of the south, the diversity of landscapes is truly breathtaking."
        ],
        gallery: [
            "https://images.pexels.com/photos/2845013/pexels-photo-2845013.jpeg",
            "https://images.pexels.com/photos/1680249/pexels-photo-1680249.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        website: "https://www.australia.com"
    },
    {
        id: "2",
        slug: "africa", // Keeping generic for now based on existing data, though likely "South Africa" or specific country
        name: "Africa",
        image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=800",
        heroImage: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Embark on a safari adventure and explore the rich cultures of the African continent.",
        longDescription: [
            "Africa is a continent of incredible diversity, home to a vast array of wildlife, landscapes, and cultures. From the savannas of the Serengeti to the deserts of Namibia, the continent offers unparalleled opportunities for exploration and discovery.",
            "Witness the Great Migration, climb Mount Kilimanjaro, or relax on the pristine beaches of Zanzibar. Africa is a destination that will touch your soul and leave you with memories that last a lifetime."
        ],
        gallery: [
            "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/259556/pexels-photo-259556.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=800"
        ],
        website: "#"
    },
    {
        id: "3",
        slug: "kerala",
        name: "Unlock Kerala",
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
        heroImage: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "God's Own Country - serene backwaters, lush greenery, and ayurvedic healing.",
        longDescription: [
            "Kerala, often referred to as God's Own Country, is a tropical paradise in the southwestern tip of India. Known for its palm-lined beaches, tranquil backwaters, and lush hill stations, Kerala offers a unique blend of nature and culture.",
            "Experience a houseboat cruise in Alleppey, rejuvenate with authentic Ayurvedic treatments, or witness the vibrant art form of Kathakali. Kerala is the perfect destination for those seeking relaxation and spiritual renewal."
        ],
        gallery: [
            "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3573383/pexels-photo-3573383.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        website: "https://www.keralatourism.org"
    },
    {
        id: "4",
        slug: "japan",
        name: "Japan",
        image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800",
        heroImage: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "A harmonious blend of ancient traditions and cutting-edge technology.",
        longDescription: [
            "Japan is a country where the past and the future coexist in perfect harmony. From the neon-lit streets of Tokyo to the serene temples of Kyoto, Japan offers a travel experience like no other.",
            "Immerse yourself in the rich culture of tea ceremonies, explore bustling markets, or marvel at the natural beauty of Mount Fuji. Japan's unique blend of tradition and innovation makes it a fascinating destination for travelers of all interests."
        ],
        gallery: [
            "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800"
        ],
        website: "https://www.japan.travel"
    }
];
