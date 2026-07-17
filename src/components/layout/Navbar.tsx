"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown, Heart, Scale } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWishlist, getCompareList } from "@/lib/storage";
import { useDestinations } from "@/hooks/useDestinations";
import { usePackages } from "@/hooks/usePackages";
import { DiyaToggle } from "@/components/shared";

const baseNavLinks: {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}[] = [
  { label: "Flight", href: "/flight" },
  { label: "Hotels", href: "/hotel" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null,
  );
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const { destinations } = useDestinations();
  const { packages } = usePackages();

  const navLinks = useMemo(() => {
    const sorted = destinations
      .slice()
      .sort((a, b) => (b.packagesCount || 0) - (a.packagesCount || 0));

    const destinationLinks = [
      { label: "All Destinations", href: "/destinations" },
      ...sorted.slice(0, 8).map((destination) => ({
        label: destination.name,
        href: `/destinations/${destination.slug}`,
      })),
    ];

    const packageLinks = [
      { label: "All Packages", href: "/packages" },
      ...packages.slice(0, 8).map((pkg) => ({
        label: pkg.title,
        href: `/packages/${pkg.slug}`,
      })),
    ];

    return [
      {
        label: "Destinations",
        href: "/destinations",
        submenu: destinationLinks,
      },
      {
        label: "Packages",
        href: "/packages",
        submenu: packageLinks,
      },
      ...baseNavLinks,
    ];
  }, [destinations, packages]);

  const groupedDestinations = useMemo(() => {
    const groups: Record<string, typeof destinations> = {
      "Southeast Asia": [],
      "East Asia": [],
      "Europe & Caucasus": [],
      "South Asia": [],
      "Central Asia": [],
      "MENA Region": [],
      Africa: [],
    };

    destinations.forEach((dest) => {
      const name = dest.name.toLowerCase();
      let region = "";

      if (
        name.includes("thailand") ||
        name.includes("bali") ||
        name.includes("vietnam") ||
        name.includes("philippines") ||
        name.includes("indonesia") ||
        name.includes("malaysia") ||
        name.includes("singapore")
      ) {
        region = "Southeast Asia";
      } else if (
        name.includes("japan") ||
        name.includes("korea") ||
        name.includes("china")
      ) {
        region = "East Asia";
      } else if (
        name.includes("switzerland") ||
        name.includes("greece") ||
        name.includes("georgia") ||
        name.includes("iceland") ||
        name.includes("europe") ||
        name.includes("russia") ||
        name.includes("france") ||
        name.includes("italy")
      ) {
        region = "Europe & Caucasus";
      } else if (
        name.includes("kerala") ||
        name.includes("ladakh") ||
        name.includes("goa") ||
        name.includes("rajasthan") ||
        name.includes("maldives") ||
        name.includes("nepal") ||
        name.includes("bhutan") ||
        name.includes("sri lanka") ||
        name.includes("india")
      ) {
        region = "South Asia";
      } else if (
        name.includes("dubai") ||
        name.includes("turkey") ||
        name.includes("egypt") ||
        name.includes("oman") ||
        name.includes("uae")
      ) {
        region = "MENA Region";
      } else if (
        name.includes("almaty") ||
        name.includes("mongolia") ||
        name.includes("kazakhstan") ||
        name.includes("uzbekistan")
      ) {
        region = "Central Asia";
      } else {
        // Fallback based on continent if available
        const continentStr = dest.continent as string;
        if (continentStr === "Europe") region = "Europe & Caucasus";
        else if (continentStr === "Africa") region = "Africa";
        else if (continentStr === "Asia") region = "South Asia";
        else region = continentStr || "Other Destinations";
      }

      if (!groups[region]) {
        groups[region] = [];
      }
      groups[region].push(dest);
    });

    // Remove empty groups to keep it clean
    return Object.entries(groups).reduce(
      (acc, [key, value]) => {
        if (value.length > 0) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, typeof destinations>,
    );
  }, [destinations]);

  const groupedPackages = useMemo(() => {
    const groups: Record<string, typeof packages> = {};
    packages.forEach((pkg) => {
      const destObj = pkg.destinationId as any;
      const destName =
        destObj && typeof destObj === "object" && destObj.name
          ? destObj.name
          : "Top Packages";
      if (!groups[destName]) {
        groups[destName] = [];
      }
      groups[destName].push(pkg);
    });

    // Limit to 7 groups to fit the mega menu, and max 5 packages per destination
    return Object.entries(groups)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 7)
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value.slice(0, 5);
          return acc;
        },
        {} as Record<string, typeof packages>,
      );
  }, [packages]);

  // Scroll Header Logic
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.95)"],
  );
  const navbarPosition = useTransform(scrollY, [0, 50], ["fixed", "sticky"]);
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(226, 88, 34, 0)", "rgba(226, 88, 34, 0.15)"],
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"],
  );

  useEffect(() => {
    const updateCounts = () => {
      setWishlistCount(getWishlist().length);
      setCompareCount(getCompareList().length);
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    window.addEventListener("wishlistUpdate", updateCounts);
    window.addEventListener("compareUpdate", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("wishlistUpdate", updateCounts);
      window.removeEventListener("compareUpdate", updateCounts);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (label: string) => {
    if (expandedMobileMenu === label) {
      setExpandedMobileMenu(null);
    } else {
      setExpandedMobileMenu(label);
    }
  };

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          borderBottom: `1px solid`,
          borderBottomColor: borderColor,
          backdropFilter: backdropBlur,
          position: navbarPosition,
        }}
        className="top-0 w-full z-[60] px-4 md:px-8 py-4 transition-all max-md:fixed!"
      >
        <div className="2xl:container mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* <motion.div className="flex items-center gap-2">
              <Image src="/images/Ananta Travel Logo.svg" alt="Ananta Travel Logo" width={100} height={40} />
            </motion.div> */}
            <DiyaToggle />
            <span className="font-bold text-lg text-primary">Ananta Yatras</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="group"
                onMouseEnter={() =>
                  link.submenu && setActiveSubmenu(link.label)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-slate-700 hover:text-black transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>

                {/* Dropdown Mega Menu */}
                {link.submenu && activeSubmenu === link.label && (
                  <>
                    {/* Invisible bridge to prevent mouse gap during animation/hover */}
                    <div className="absolute top-[calc(100%-24px)] left-0 right-0 h-[48px] bg-transparent z-40" />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 pt-4 w-full z-50 pointer-events-auto"
                    >
                      <div className="bg-background rounded-2xl shadow-premium border border-primary/10 p-8 relative">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6">
                          {link.label === "Packages"
                            ? Object.entries(groupedPackages).map(
                                ([destName, items]) => (
                                  <div
                                    key={destName}
                                    className="flex flex-col space-y-3"
                                  >
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                                      {destName}
                                    </h4>
                                    <div className="flex flex-col space-y-2">
                                      {items.map((pkg) => (
                                        <Link
                                          key={pkg.id}
                                          href={`/packages/${pkg.slug}`}
                                          className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors line-clamp-1"
                                          title={pkg.title}
                                          onClick={() => setActiveSubmenu(null)}
                                        >
                                          {pkg.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )
                            : Object.entries(groupedDestinations).map(
                                ([region, items]) => (
                                  <div
                                    key={region}
                                    className="flex flex-col space-y-3"
                                  >
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">
                                      {region}
                                    </h4>
                                    <div className="flex flex-col space-y-2">
                                      {items.map((dest) => (
                                        <Link
                                          key={dest.id}
                                          href={`/destinations/${dest.slug}`}
                                          className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                                          onClick={() => setActiveSubmenu(null)}
                                        >
                                          {dest.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                          <Link
                            href={link.href}
                            className="text-sm font-bold text-primary hover:brightness-110 inline-flex items-center gap-1.5 group/btn"
                            onClick={() => setActiveSubmenu(null)}
                          >
                            {link.label === "Packages"
                              ? "View All Packages"
                              : "View All Destinations"}
                            <span className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* <DiyaToggle /> */}
            {/* <Link
              href="/wishlist"
              className="hidden md:flex relative p-2 text-slate-700 hover:text-primary transition-colors rounded-full hover:bg-primary/10"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background">
                  {wishlistCount}
                </span>
              )}
            </Link> */}

            <Link href="/contact" className="hidden md:block">
              <button className="bg-primary hover:brightness-110 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-floating hover:shadow-premium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Us
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full hover:bg-slate-100 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] lg:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-background z-[50] shadow-2xl lg:hidden overflow-y-auto border-l border-primary/10"
            >
              <div className="p-6 pt-24 space-y-6">
                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <div
                      key={link.label}
                      className="border-b border-slate-50 pb-2"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.submenu ? "#" : link.href} // Prevent navigation for parents
                          onClick={(e) => {
                            if (link.submenu) {
                              e.preventDefault();
                              toggleMobileSubmenu(link.label);
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className="block py-3 text-lg font-semibold text-slate-800 flex-1"
                        >
                          {link.label}
                        </Link>
                        {link.submenu && (
                          <button
                            onClick={() => toggleMobileSubmenu(link.label)}
                            className="p-2 text-slate-400"
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${expandedMobileMenu === link.label ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Accordion Submenu */}
                      <AnimatePresence>
                        {link.submenu && expandedMobileMenu === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-3 pt-2">
                              {link.submenu.map((sublink) => (
                                <Link
                                  key={sublink.label}
                                  href={sublink.href}
                                  className="block py-1 text-slate-600 font-medium hover:text-primary transition-colors line-clamp-1"
                                  title={sublink.label}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sublink.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="space-y-4 pt-6">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 text-slate-700 py-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist ({wishlistCount})
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block pt-4"
                  >
                    <button className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-floating active:scale-95 transition-transform">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
