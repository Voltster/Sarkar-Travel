"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInWishlist, toggleWishlist } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  packageId: string;
  variant?: "icon" | "full";
  className?: string;
}

export function WishlistButton({ packageId, variant = "icon", className }: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWishlisted(isInWishlist(packageId));

    const handleUpdate = () => {
      setWishlisted(isInWishlist(packageId));
    };

    window.addEventListener("wishlistUpdate", handleUpdate);
    return () => window.removeEventListener("wishlistUpdate", handleUpdate);
  }, [packageId]);

  const handleClick = useCallback(() => {
    const newState = toggleWishlist(packageId);
    setWishlisted(newState);
  }, [packageId]);

  // Don't render until mounted (avoids hydration mismatch)
  if (!mounted) {
    return variant === "full" ? (
      <Button variant="outline" className={cn("gap-2", className)}>
        <Heart className="w-4 h-4" />
        Save
      </Button>
    ) : (
      <button
        className={cn(
          "p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <Heart className="w-5 h-5 text-slate-600" />
      </button>
    );
  }

  if (variant === "full") {
    return (
      <Button
        onClick={handleClick}
        variant="outline"
        className={cn(
          "gap-2",
          wishlisted && "bg-red-50 border-red-200 text-red-600 hover:bg-red-100",
          className
        )}
      >
        <Heart className={cn("w-4 h-4", wishlisted && "fill-red-500 text-red-500")} />
        {wishlisted ? "Saved" : "Save"}
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform",
        className
      )}
      title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("w-5 h-5", wishlisted ? "fill-red-500 text-red-500" : "text-slate-600")} />
    </button>
  );
}
