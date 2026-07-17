# 🚀 Quick Start Guide

## Instant Setup (3 Commands)

```bash
# 1. Install dependencies (if not done)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:3000
```

## 📸 Add Images (Before First View)

Place images in `public/images/` directory:

### Required Images:
```
public/images/
├── dubai.jpg
├── maldives.jpg
├── singapore.jpg
├── vietnam.jpg
├── bali.jpg
├── bali-2.jpg
├── korea.jpg
├── malaysia.jpg
├── india.jpg
├── china.jpg
├── australia.jpg
├── austria.jpg
├── japan.jpg
├── dest-1.jpg
├── dest-2.jpg
├── dest-3.jpg
├── dest-4.jpg
├── dest-5.jpg
├── dest-6.jpg
├── testimonial-1.jpg
├── testimonial-2.jpg
└── testimonial-3.jpg
```

**Recommended Sizes:**
- Destinations: 800×600px
- Testimonials: 400×400px
- Hero grid: 400×300px

## 🎨 Quick Customization

### 1. Change Brand Name
**Files to edit:**
- `src/components/layout/Navbar.tsx` (Line ~42)
- `src/components/layout/Footer.tsx` (Line ~53)

### 2. Update Contact Info
**Edit:** `src/components/layout/Footer.tsx`
```tsx
// Lines 64-76
<Phone /> +91 YOUR_NUMBER
<Mail /> your@email.com
<MapPin /> Your Address
```

### 3. Change Primary Color
**Find & Replace across all files:**
- `red-600` → `your-color-600`
- `red-700` → `your-color-700`

### 4. Update Packages
**Edit:** `src/components/home/PackagesSection.tsx`
```tsx
const packages = [
  {
    title: "Your Package Title",
    price: "₹XX,XXX",
    // ... update all fields
  },
];
```

### 5. Update Statistics
**Edit:** `src/components/home/StatsSection.tsx`
```tsx
const stats = [
  { value: 1000, suffix: "+", label: "Your Metric" },
];
```

## 🎬 Animation Speed

### Make Animations Faster
```tsx
transition={{ duration: 0.3 }}  // Default: 0.6
```

### Make Animations Slower
```tsx
transition={{ duration: 1.0 }}
```

### Disable Animations
Remove `motion.` prefix:
```tsx
<div>  // Instead of <motion.div>
```

## 📱 Test Responsive Design

### Browser DevTools
1. Open DevTools (F12)
2. Click device toolbar icon
3. Test different screen sizes

### Recommended Test Sizes:
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1440px

## 🚀 Deploy to Production

### Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Locally
```bash
npm run build
npm start
```

## 📚 Need More Help?

- **Setup Details**: See `SETUP_GUIDE.md`
- **Component Docs**: See `COMPONENTS.md`
- **Full Summary**: See `SUMMARY.md`
- **Project Info**: See `README.md`

## ✅ Pre-Launch Checklist

- [ ] Images added to `public/images/`
- [ ] Brand name updated
- [ ] Contact info updated
- [ ] Package data customized
- [ ] Testimonials updated
- [ ] Stats updated
- [ ] Tested on mobile
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Links work correctly
- [ ] Page loads fast

## 🎉 That's It!

Your landing page is ready to go!

**Current Status:**
✅ All components created
✅ Animations implemented
✅ Responsive design ready
✅ Dark mode supported
⏳ Add your images
⏳ Customize content
⏳ Deploy

---

**Pro Tip:** The dev server auto-reloads when you save files. Edit and see changes instantly!
