# Setup Guide for Ananta Travels Landing Page

## 📋 Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run setup script:**
   ```bash
   ./setup.sh
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🖼️ Adding Images

### Option 1: Use Your Own Images

1. Add images to `public/images/` directory with these names:

   **Destinations:**
   - dubai.jpg
   - maldives.jpg
   - singapore.jpg
   - vietnam.jpg
   - bali.jpg
   - bali-2.jpg
   - korea.jpg
   - malaysia.jpg
   - india.jpg
   - china.jpg
   - australia.jpg
   - austria.jpg
   - japan.jpg

   **Hero Background Grid:**
   - dest-1.jpg through dest-6.jpg

   **Testimonials:**
   - testimonial-1.jpg
   - testimonial-2.jpg
   - testimonial-3.jpg

2. Recommended image specifications:
   - Destinations: 800x600px (4:3 ratio)
   - Testimonials: 400x400px (1:1 ratio)
   - Hero grid: 400x300px (4:3 ratio)
   - Format: JPG or WebP
   - Size: < 500KB per image (optimized)

### Option 2: Use Placeholder Images

The app will work without images, showing broken image icons. To use placeholders during development:

1. Edit `src/lib/images.ts`
2. Uncomment the placeholder service code:
   ```typescript
   return fallbackCategory 
     ? getPlaceholderUrl(fallbackCategory, fallbackText)
     : path;
   ```

### Option 3: Download Free Stock Images

Use these resources for high-quality travel images:

- **Unsplash**: https://unsplash.com/s/photos/travel
- **Pexels**: https://pexels.com/search/travel
- **Pixabay**: https://pixabay.com/images/search/travel

## 🎨 Customization

### 1. Branding

**Update Logo and Brand Name:**

Edit `src/components/layout/Navbar.tsx`:
```tsx
<div className="font-bold text-xl">
  Your Brand Name
</div>
```

Edit `src/components/layout/Footer.tsx` similarly.

### 2. Colors

**Primary Theme Color (Red):**

Edit `src/app/globals.css` and replace `red-600` with your color throughout the components:
- Buttons
- Highlights
- Badges

Or use Tailwind's color system:
```tsx
className="bg-blue-600 hover:bg-blue-700"  // For blue theme
className="bg-green-600 hover:bg-green-700"  // For green theme
```

### 3. Content

**Update Package Data:**

Edit `src/components/home/PackagesSection.tsx`:
```typescript
const packages = [
  {
    id: 1,
    title: "Your Package Title",
    location: "Location",
    price: "₹XX,XXX",
    // ... more fields
  },
];
```

**Update Destinations:**

Edit `src/components/home/DestinationsCarousel.tsx`:
```typescript
const destinations = [
  { name: "Your Destination", image: "/images/your-image.jpg" },
];
```

**Update Statistics:**

Edit `src/components/home/StatsSection.tsx`:
```typescript
const stats = [
  { value: 1000, suffix: "+", label: "Your Metric", icon: "📊" },
];
```

**Update Testimonials:**

Edit `src/components/home/TestimonialsSection.tsx`:
```typescript
const testimonials = [
  {
    name: "Customer Name",
    text: "Review text",
    rating: 5,
    // ... more fields
  },
];
```

**Update Navigation Links:**

Edit `src/components/layout/Navbar.tsx`:
```typescript
const navLinks = [
  { label: "Your Link", href: "#section" },
];
```

### 4. Contact Information

**Update Contact Details:**

Edit `src/components/layout/Footer.tsx`:
```tsx
<Phone />
<a href="tel:+1234567890">Your Phone Number</a>

<Mail />
<a href="mailto:your@email.com">your@email.com</a>
```

Also update in `src/components/layout/Navbar.tsx` top bar.

### 5. Animation Timing

Adjust animation speeds in component files:

```typescript
// Slower animations
transition={{ duration: 1.0, delay: 0.3 }}

// Faster animations
transition={{ duration: 0.3, delay: 0.1 }}
```

### 6. Metadata & SEO

Edit `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Business Name - Travel Services",
  description: "Your custom description",
};
```

## 🏗️ Component Structure Explained

### Page Assembly (src/app/page.tsx)
The main page imports and arranges all sections:
```tsx
<HeroSection />
<StatsSection />
<PackagesSection />
// ... more sections
```

### Layout (src/app/layout.tsx)
Wraps all pages with Navbar and Footer:
```tsx
<Navbar />
{children}
<Footer />
```

### Section Components (src/components/home/)
Each section is a self-contained component with:
- Its own data
- Animation logic
- Responsive design
- Hover effects

### UI Components (src/components/ui/)
Shadcn components used throughout:
- `Button` - Interactive buttons
- `Card` - Content containers
- `Badge` - Small labels and tags

### Animation Components (src/components/animation/)
Reusable animation wrappers:
- `FadeIn` - Fade and slide animations
- `StaggerContainer` - Sequential animations
- `Parallax` - Scroll-based effects

## 🔧 Advanced Configuration

### Add New Section

1. Create component in `src/components/home/`:
   ```tsx
   // NewSection.tsx
   "use client";
   import { motion } from "framer-motion";
   
   export function NewSection() {
     return (
       <section className="py-20">
         {/* Your content */}
       </section>
     );
   }
   ```

2. Import and add to `src/app/page.tsx`:
   ```tsx
   import { NewSection } from "@/components/home/NewSection";
   
   <NewSection />
   ```

### Add New Shadcn Component

```bash
npx shadcn@latest add [component-name]
```

Available components: dialog, dropdown-menu, tabs, etc.

## 🐛 Troubleshooting

### Images not showing
- Check image paths are correct
- Ensure images are in `public/images/`
- Check browser console for 404 errors

### Animations not working
- Verify Framer Motion is installed
- Check component has `"use client"` directive
- Inspect browser console for errors

### Styling issues
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check Tailwind config is correct

### Build errors
- Run `npm run build` to see specific errors
- Check TypeScript types are correct
- Ensure all imports are valid

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

Deploy the `.next` folder and `node_modules` to your hosting provider.

## ✅ Checklist Before Going Live

- [ ] Replace all placeholder images with real images
- [ ] Update all text content (packages, testimonials, etc.)
- [ ] Update contact information (phone, email, address)
- [ ] Update social media links
- [ ] Test all navigation links
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Test all animations
- [ ] Update metadata for SEO
- [ ] Add Google Analytics (optional)
- [ ] Test contact forms (if added)
- [ ] Check browser compatibility

## 🎉 You're All Set!

Your landing page is now ready for customization and deployment. Enjoy building your travel website!
