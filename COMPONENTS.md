# Component Documentation

## Component Architecture

This landing page follows a modular, component-based architecture with clear separation of concerns.

## 📦 Component Categories

### 1. Layout Components (`src/components/layout/`)

#### Navbar
**Purpose:** Top navigation with sticky positioning

**Features:**
- Sticky header that stays at top while scrolling
- Mobile-responsive with hamburger menu
- Top contact bar (hidden on mobile)
- Smooth animations on mount
- Dark mode support

**Props:** None (uses internal state)

**Usage:**
```tsx
import { Navbar } from "@/components/layout/Navbar";
<Navbar />
```

#### Footer
**Purpose:** Site footer with links and contact info

**Features:**
- Multi-column layout (responsive)
- Social media links with hover animations
- Contact information display
- Newsletter signup area (can be added)
- Dark theme

**Props:** None

**Usage:**
```tsx
import { Footer } from "@/components/layout/Footer";
<Footer />
```

---

### 2. Home Page Sections (`src/components/home/`)

#### HeroSection
**Purpose:** Main hero/banner area

**Features:**
- Animated image grid background
- Quick action buttons
- Stagger animation for content
- CTA button
- Responsive typography

**Key Animations:**
- Fade-in-up effect
- Background grid appears sequentially
- Hover effects on buttons

**Usage:**
```tsx
import { HeroSection } from "@/components/home/HeroSection";
<HeroSection />
```

---

#### StatsSection
**Purpose:** Display company statistics/achievements

**Features:**
- Animated counters (count up effect)
- 4 stat cards in grid
- Icon display
- Hover scale effect
- Intersection Observer for triggering animations

**Customization:**
```tsx
const stats = [
  { 
    value: 1160,     // Number to count to
    suffix: "+",     // Suffix after number
    label: "Label",  // Description
    icon: "👥"       // Emoji or component
  },
];
```

**Usage:**
```tsx
import { StatsSection } from "@/components/home/StatsSection";
<StatsSection />
```

---

#### PackagesSection
**Purpose:** Showcase travel packages in card grid

**Features:**
- Responsive grid (1-4 columns)
- Package cards with image, details, pricing
- Badge system for highlights
- Hover lift effect
- Stagger animation on scroll

**Package Data Structure:**
```tsx
{
  id: number;
  title: string;
  location: string;
  price: string;
  originalPrice: string;
  duration: string;
  travelers: string;
  highlights: string[];
  image: string;
  tag: string;
}
```

**Usage:**
```tsx
import { PackagesSection } from "@/components/home/PackagesSection";
<PackagesSection />
```

---

#### DestinationsCarousel
**Purpose:** Horizontal scrolling carousel of destinations

**Features:**
- Smooth horizontal scroll
- Navigation arrows
- Hover zoom effect
- Overlay gradient
- Mobile touch scroll

**Props:**
```tsx
interface Props {
  title: string;  // Section heading
}
```

**Usage:**
```tsx
import { DestinationsCarousel } from "@/components/home/DestinationsCarousel";
<DestinationsCarousel title="Popular Destinations" />
```

---

#### TestimonialsSection
**Purpose:** Display customer reviews

**Features:**
- 3-column grid (responsive)
- Star ratings
- Dark themed section
- Glassmorphism cards
- Quote icon animation
- Customer avatars

**Testimonial Data Structure:**
```tsx
{
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;  // 1-5
  text: string;
}
```

**Usage:**
```tsx
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
<TestimonialsSection />
```

---

#### DurationPackages
**Purpose:** Packages filtered by duration

**Features:**
- Duration filter tabs
- Grid layout
- Image overlay cards
- Badge for night count
- Hover effects

**Usage:**
```tsx
import { DurationPackages } from "@/components/home/DurationPackages";
<DurationPackages />
```

---

#### PartnersSection
**Purpose:** Show partner organizations and awards

**Features:**
- Partner logo grid
- Award/certification badges
- Hover animations
- Grayscale to color effect

**Usage:**
```tsx
import { PartnersSection } from "@/components/home/PartnersSection";
<PartnersSection />
```

---

### 3. Animation Components (`src/components/animation/`)

#### FadeIn
**Purpose:** Reusable fade-in animation wrapper

**Props:**
```tsx
{
  children: ReactNode;
  delay?: number;          // Delay in seconds (default: 0)
  direction?: "up" | "down" | "left" | "right";  // Default: "up"
  duration?: number;       // Duration in seconds (default: 0.6)
  className?: string;
}
```

**Usage:**
```tsx
import { FadeIn } from "@/components/animation";

<FadeIn direction="up" delay={0.2}>
  <YourComponent />
</FadeIn>
```

---

#### StaggerContainer & StaggerItem
**Purpose:** Sequential animations for list items

**Props:**
```tsx
// StaggerContainer
{
  children: ReactNode;
  staggerDelay?: number;   // Delay between items (default: 0.1)
  className?: string;
}

// StaggerItem
{
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
import { StaggerContainer, StaggerItem } from "@/components/animation";

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

#### Parallax
**Purpose:** Scroll-based parallax effect

**Props:**
```tsx
{
  children: ReactNode;
  speed?: number;          // Parallax speed (default: 0.5)
  className?: string;
}
```

**Usage:**
```tsx
import { Parallax } from "@/components/animation";

<Parallax speed={0.8}>
  <BackgroundElement />
</Parallax>
```

---

### 4. UI Components (`src/components/ui/`)

These are Shadcn UI components. Refer to [Shadcn documentation](https://ui.shadcn.com) for detailed usage.

#### Button
Accessible button component with variants

**Variants:**
- `default` - Primary button
- `destructive` - Danger button
- `outline` - Outlined button
- `secondary` - Secondary style
- `ghost` - Transparent background
- `link` - Link style

**Sizes:**
- `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click Me
</Button>
```

---

#### Card
Container component for content grouping

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Top section
- `CardContent` - Main content
- `CardFooter` - Bottom section
- `CardTitle` - Title text
- `CardDescription` - Description text

**Usage:**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

#### Badge
Small label/tag component

**Variants:**
- `default` - Primary badge
- `secondary` - Secondary style
- `destructive` - Danger style
- `outline` - Outlined style

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">New</Badge>
```

---

## 🎨 Styling System

### Tailwind CSS Classes

**Colors:**
- Primary: `red-600` (customizable)
- Backgrounds: `slate-50`, `slate-100`, `white`
- Dark mode: `dark:bg-slate-900`, `dark:text-white`

**Spacing:**
- Sections: `py-20` (top/bottom padding)
- Container: `container mx-auto px-4`
- Gaps: `gap-4`, `gap-6`, `gap-8`

**Typography:**
- Headings: `text-4xl md:text-5xl font-bold`
- Body: `text-base leading-relaxed`
- Small: `text-sm text-slate-600`

**Animations:**
All Framer Motion based - no Tailwind animation classes needed

---

## 🔄 State Management

### Client Components
All sections use `"use client"` directive for interactivity

### State Patterns
- Local state with `useState` (Navbar menu)
- Refs with `useRef` (Carousel scroll)
- Animation state with Framer Motion hooks

---

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile-First Approach
Default styles apply to mobile, then enhanced for larger screens:

```tsx
className="text-2xl md:text-4xl lg:text-5xl"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
```

---

## ⚡ Performance Optimizations

### Code Splitting
- Each section is a separate component
- Auto code-splitting by Next.js

### Lazy Loading
- Images lazy load by default
- Animations triggered on scroll (viewport detection)

### Animation Performance
- GPU-accelerated transforms
- `will-change` automatically applied by Framer Motion
- Intersection Observer for scroll triggers

---

## 🎯 Best Practices

### Adding New Sections

1. Create component in `src/components/home/`
2. Add `"use client"` if using interactivity
3. Import animations from `@/components/animation`
4. Use Shadcn UI components for consistency
5. Add to `src/app/page.tsx`

### Customizing Animations

**Adjust timing:**
```tsx
transition={{ duration: 0.6, delay: 0.2 }}
```

**Change easing:**
```tsx
transition={{ ease: [0.22, 1, 0.36, 1] }}
```

**Disable for performance:**
```tsx
// Remove motion.div, use regular div
```

### Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation supported
- Focus states visible
- Color contrast meets WCAG AA

---

## 🧪 Testing Components

### Manual Testing Checklist

- [ ] Component renders without errors
- [ ] Animations play smoothly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode looks correct
- [ ] Hover effects work
- [ ] Links navigate correctly
- [ ] Images load (or show placeholders)

### Browser Testing

- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)

---

## 📚 Further Reading

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
