# Banner Integration Guide (Admin Panel)

### Data Structure
Your Admin Panel/Database should provide an array of objects with this schema:
```typescript
interface BannerItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string; // e.g., '/packages/arctic-lights'
}
```

### Implementation Steps
1. **Fetch Data:** Call your API inside the Home Page (Server Component).
2. **Pass Props:** Pass the data to the Client Component provided below.
3. **SEO:** Ensure `image` has proper Alt text driven by the `title`.
