# Ananta Travels - Landing Page

A modern, optimized travel website landing page built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, and Framer Motion.

## 🚀 Features

- ⚡ **Optimized Performance**: Built with Next.js 15 for optimal loading speeds
- 🎨 **Modern UI**: Using Shadcn UI components for a consistent design system
- ✨ **Smooth Animations**: Framer Motion for engaging user interactions
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎯 **Component-Based**: Clean, reusable component architecture
- 🌙 **Dark Mode Ready**: Full dark mode support built-in
- ♿ **Accessible**: Following WCAG guidelines for accessibility

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Homepage assembling all sections
│   └── globals.css         # Global styles & Tailwind config
├── components/
│   ├── animation/          # Reusable animation components
│   │   ├── FadeIn.tsx
│   │   ├── StaggerContainer.tsx
│   │   ├── Parallax.tsx
│   │   └── index.ts
│   ├── home/               # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── DestinationsCarousel.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── DurationPackages.tsx
│   │   └── PartnersSection.tsx
│   ├── layout/             # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/                 # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
└── lib/
    └── utils.ts            # Utility functions
```

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Component Overview

### Hero Section
- Full-screen hero with gradient background
- Image grid animation
- Call-to-action buttons
- Quick link navigation

### Stats Section
- Animated counter components
- Achievement highlights
- Interactive hover effects

### Packages Section
- Grid layout of travel packages
- Price comparison display
- Badge system for highlights
- Hover animations

### Destinations Carousel
- Horizontal scrolling carousel
- Smooth scroll behavior
- Navigation controls
- Parallax effects on hover

### Testimonials Section
- Customer review cards
- Star rating display
- Dark themed section
- Glassmorphism effects

### Duration Packages
- Filterable package display
- Duration-based categorization
- Image overlays
- Interactive cards

### Partners Section
- Tourism board partners showcase
- Award & certification display
- Hover scale animations

## 🖼️ Adding Images

The components reference placeholder images. To add your own images:

1. Place your images in the `public/images/` directory:
   ```
   public/
   └── images/
       ├── dubai.jpg
       ├── maldives.jpg
       ├── singapore.jpg
       ├── vietnam.jpg
       ├── bali.jpg
       ├── korea.jpg
       ├── malaysia.jpg
       ├── india.jpg
       ├── china.jpg
       ├── australia.jpg
       ├── austria.jpg
       ├── japan.jpg
       ├── testimonial-1.jpg
       ├── testimonial-2.jpg
       ├── testimonial-3.jpg
       └── dest-1.jpg to dest-6.jpg
   ```

2. Or use a service like Unsplash for placeholder images temporarily

## 🎭 Animation Components

### FadeIn
```tsx
import { FadeIn } from "@/components/animation";

<FadeIn direction="up" delay={0.2}>
  <YourComponent />
</FadeIn>
```

### StaggerContainer
```tsx
import { StaggerContainer, StaggerItem } from "@/components/animation";

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <ItemCard {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

## 📦 Key Dependencies

- **Next.js 16**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **Shadcn UI**: Component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 🎨 Customization

### Colors
Update the color scheme in `src/app/globals.css`

### Content
Update content in each section component:
- Package data in `PackagesSection.tsx`
- Destination list in `DestinationsCarousel.tsx`
- Testimonials in `TestimonialsSection.tsx`
- Navigation links in `Navbar.tsx`
- Footer links in `Footer.tsx`


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
udate.
