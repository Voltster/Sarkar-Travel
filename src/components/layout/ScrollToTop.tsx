"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top of the page on route change
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Instant scroll is cleaner than smooth scroll for new page navigation
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
