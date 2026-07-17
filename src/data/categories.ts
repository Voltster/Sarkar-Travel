export interface CategoryItem {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    link: string;
}

export const trendingDestinations: CategoryItem[] = [
    { id: 1, title: "New Delhi", subtitle: "46 Packages", image: "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/new-delhi" },
    { id: 2, title: "Mumbai", subtitle: "12 Packages", image: "https://images.pexels.com/photos/2574636/pexels-photo-2574636.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/mumbai" },
    { id: 3, title: "Goa", subtitle: "09 Packages", image: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg", link: "/destinations/goa" },
    { id: 4, title: "Chennai", subtitle: "32 Packages", image: "https://images.pexels.com/photos/18625307/pexels-photo-18625307.jpeg ", link: "/destinations/chennai" },
    { id: 5, title: "Kolkata", subtitle: "03 Packages", image: "https://images.pexels.com/photos/3520942/pexels-photo-3520942.jpeg", link: "/destinations/kolkata" },
    { id: 6, title: "Hyderabad", subtitle: "15 Packages", image: "https://images.pexels.com/photos/720726/pexels-photo-720726.jpeg", link: "/destinations/hyderabad" },
    { id: 7, title: "Rishikesh", subtitle: "19 Packages", image: "https://images.pexels.com/photos/20035455/pexels-photo-20035455.jpeg", link: "/destinations/rishikesh" },
];

export const visaFreeDestinations: CategoryItem[] = [
    { id: 1, title: "Malaysia", image: "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/malaysia" },
    { id: 2, title: "Seychelles", image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/seychelles" },
    { id: 3, title: "Thailand", image: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/thailand" },
    { id: 4, title: "Mauritius", image: "https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/mauritius" },
    { id: 5, title: "Maldives", image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/destinations/maldives" },
];

export const seasonsEvents: CategoryItem[] = [
    { id: 1, title: "Northern Lights", image: "https://images.pexels.com/photos/640947/pexels-photo-640947.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/search?q=Northern Lights" },
    { id: 2, title: "Ski Season", image: "https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/search?q=Skiing" },
    { id: 3, title: "Shopping Festival", image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/search?q=Shopping" },
    { id: 4, title: "Cherry Blossom", image: "https://images.pexels.com/photos/2058498/pexels-photo-2058498.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/search?q=Cherry Blossom" },
    { id: 5, title: "Sunrises", image: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800", link: "/search?q=Sunrises" },
];

export const durationOptions = [
    { label: "3-5 Days", id: "short" },
    { label: "6-9 Days", id: "medium" },
    { label: "10+ Days", id: "long" },
];

export const durationPackages = [
    {
        id: 1,
        destination: "Malaysia",
        price: "35,000",
        image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-2",
        link: "/packages/malaysia-delight",
        duration: "short"
    },
    {
        id: 2,
        destination: "Bali",
        price: "50,000",
        image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 md:col-span-1 row-span-3",
        link: "/packages/bali-bliss",
        duration: "medium"
    },
    {
        id: 3,
        destination: "Australia",
        price: "80,000",
        image: "https://images.pexels.com/photos/1680249/pexels-photo-1680249.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/australia-adventure",
        duration: "long"
    },
    {
        id: 4,
        destination: "South Africa",
        price: "51,000",
        image: "https://images.pexels.com/photos/259556/pexels-photo-259556.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/wild-south-africa",
        duration: "long"
    },
    {
        id: 5,
        destination: "Abu Dhabi",
        price: "40,000",
        image: "https://images.pexels.com/photos/442579/pexels-photo-442579.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/abu-dhabi-stopover",
        duration: "short"
    },
    {
        id: 6,
        destination: "Korea",
        price: "60,000",
        image: "https://images.pexels.com/photos/2376713/pexels-photo-2376713.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/soul-of-seoul",
        duration: "medium"
    },
    {
        id: 7,
        destination: "Japan",
        price: "55,000",
        image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 md:col-span-1 row-span-1",
        link: "/packages/japan-discovery",
        duration: "medium"
    },
    {
        id: 8,
        destination: "Dubai",
        price: "30,000",
        image: "https://images.pexels.com/photos/1534411/pexels-photo-1534411.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/dubai-express",
        duration: "short"
    },
    {
        id: 9,
        destination: "Vietnam",
        price: "45,000",
        image: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/vietnam-explorer",
        duration: "medium"
    },
    {
        id: 10,
        destination: "Switzerland",
        price: "1,50,000",
        image: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/swiss-alps",
        duration: "long"
    },
    {
        id: 11,
        destination: "Singapore",
        price: "55,000",
        image: "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/singapore-fling",
        duration: "short"
    },
    {
        id: 12,
        destination: "Europe",
        price: "2,00,000",
        image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
        className: "col-span-1 row-span-1",
        link: "/packages/grand-europe",
        duration: "long"
    }
];
