import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbItem } from "@/types";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "hero";
}

export function Breadcrumb({ items, className = "", variant = "default" }: BreadcrumbProps) {
  const isHero = variant === "hero";

  const baseTextColor = isHero ? "text-white/70" : "text-slate-500";
  const hoverColor = isHero ? "hover:text-white" : "hover:text-black/80";
  const activeColor = isHero ? "text-white" : "text-black/80";
  const separatorColor = isHero ? "text-white/50" : "text-slate-400";

  return (
    <nav className={`flex items-center gap-2 text-sm ${baseTextColor} ${className}`}>
      <Link
        href="/"
        className={`${hoverColor} transition-colors flex items-center gap-1`}
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className={`w-4 h-4 ${separatorColor}`} />
          {item.href ? (
            <Link
              href={item.href}
              className={`${hoverColor} transition-colors`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`${activeColor} font-medium truncate max-w-[200px]`}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
