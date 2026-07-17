"use client";

import { useState, useEffect, useCallback } from "react";
import { GitCompare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInCompare, addToCompare, removeFromCompare } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface CompareButtonProps {
  packageId: string;
  variant?: "icon" | "full";
  className?: string;
  onError?: (message: string) => void;
}

export function CompareButton({ packageId, variant = "icon", className, onError }: CompareButtonProps) {
  const [inCompare, setInCompare] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setInCompare(isInCompare(packageId));

    const handleUpdate = () => {
      setInCompare(isInCompare(packageId));
    };

    window.addEventListener("compareUpdate", handleUpdate);
    return () => window.removeEventListener("compareUpdate", handleUpdate);
  }, [packageId]);

  const handleClick = useCallback(() => {
    if (inCompare) {
      removeFromCompare(packageId);
      setInCompare(false);
    } else {
      const result = addToCompare(packageId);
      if (result.success) {
        setInCompare(true);
      } else {
        onError?.(result.message);
      }
    }
  }, [inCompare, packageId, onError]);

  // Don't render until mounted (avoids hydration mismatch)
  if (!mounted) {
    return variant === "full" ? (
      <Button variant="outline" className={cn("gap-2", className)}>
        <GitCompare className="w-4 h-4" />
        Compare
      </Button>
    ) : (
      <button
        className={cn(
          "p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <GitCompare className="w-4 h-4 text-slate-600" />
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
          inCompare && "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100",
          className
        )}
      >
        {inCompare ? (
          <>
            <Check className="w-4 h-4" />
            In Compare
          </>
        ) : (
          <>
            <GitCompare className="w-4 h-4" />
            Compare
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform",
        inCompare && "bg-blue-100",
        className
      )}
      title={inCompare ? "Remove from compare" : "Add to compare"}
    >
      {inCompare ? (
        <Check className="w-5 h-5 text-blue-600" />
      ) : (
        <GitCompare className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
