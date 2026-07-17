"use client";

const WISHLIST_KEY = "ananta_wishlist";
const COMPARE_KEY = "ananta_compare";
const RECENTLY_VIEWED_KEY = "ananta_recently_viewed";
const MAX_COMPARE = 3;
const MAX_RECENTLY_VIEWED = 10;

// Wishlist Functions
export function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWishlist(packageId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.includes(packageId)) {
    wishlist.push(packageId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: wishlist }));
  }
}

export function removeFromWishlist(packageId: string): void {
  const wishlist = getWishlist().filter(id => id !== packageId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: wishlist }));
}

export function toggleWishlist(packageId: string): boolean {
  const wishlist = getWishlist();
  if (wishlist.includes(packageId)) {
    removeFromWishlist(packageId);
    return false;
  } else {
    addToWishlist(packageId);
    return true;
  }
}

export function isInWishlist(packageId: string): boolean {
  return getWishlist().includes(packageId);
}

export function clearWishlist(): void {
  localStorage.removeItem(WISHLIST_KEY);
  window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: [] }));
}

// Compare Functions
export function getCompareList(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(COMPARE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToCompare(packageId: string): { success: boolean; message: string } {
  const compareList = getCompareList();
  
  if (compareList.includes(packageId)) {
    return { success: false, message: "Package already in compare list" };
  }
  
  if (compareList.length >= MAX_COMPARE) {
    return { success: false, message: `Can only compare up to ${MAX_COMPARE} packages` };
  }
  
  compareList.push(packageId);
  localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  window.dispatchEvent(new CustomEvent("compareUpdate", { detail: compareList }));
  
  return { success: true, message: "Added to compare" };
}

export function removeFromCompare(packageId: string): void {
  const compareList = getCompareList().filter(id => id !== packageId);
  localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  window.dispatchEvent(new CustomEvent("compareUpdate", { detail: compareList }));
}

export function isInCompare(packageId: string): boolean {
  return getCompareList().includes(packageId);
}

export function clearCompare(): void {
  localStorage.removeItem(COMPARE_KEY);
  window.dispatchEvent(new CustomEvent("compareUpdate", { detail: [] }));
}

// Recently Viewed Functions
export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToRecentlyViewed(packageId: string): void {
  let recentlyViewed = getRecentlyViewed().filter(id => id !== packageId);
  recentlyViewed.unshift(packageId);
  recentlyViewed = recentlyViewed.slice(0, MAX_RECENTLY_VIEWED);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
}

export function clearRecentlyViewed(): void {
  localStorage.removeItem(RECENTLY_VIEWED_KEY);
}

// Custom hook helpers for use with useState
export function useWishlistSync() {
  if (typeof window === "undefined") return;
  
  return {
    subscribe: (callback: (wishlist: string[]) => void) => {
      const handler = (e: CustomEvent) => callback(e.detail);
      window.addEventListener("wishlistUpdate", handler as EventListener);
      return () => window.removeEventListener("wishlistUpdate", handler as EventListener);
    },
    getSnapshot: () => getWishlist()
  };
}

export function useCompareSync() {
  if (typeof window === "undefined") return;
  
  return {
    subscribe: (callback: (compareList: string[]) => void) => {
      const handler = (e: CustomEvent) => callback(e.detail);
      window.addEventListener("compareUpdate", handler as EventListener);
      return () => window.removeEventListener("compareUpdate", handler as EventListener);
    },
    getSnapshot: () => getCompareList()
  };
}
