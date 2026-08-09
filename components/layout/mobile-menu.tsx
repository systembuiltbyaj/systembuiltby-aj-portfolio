"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  BarChart3,
  ChevronRight,
  Clapperboard,
  Globe,
  Home,
  Layers,
  LayoutGrid,
  Package,
  User,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MobileNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

type MobileNavGroup = {
  heading: string;
  items: MobileNavItem[];
};

const navGroups: MobileNavGroup[] = [
  {
    heading: "Menu",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "About", href: "/about", icon: User },
      { label: "System Builds", href: "/system-builds", icon: Clapperboard },
      { label: "Web Showcase", href: "/projects", icon: Globe },
      { label: "MVP", href: "/real-apps", icon: LayoutGrid },
      { label: "Certificates & Badges", href: "/about#badges", icon: Award },
    ],
  },
  {
    heading: "Work With Me",
    items: [
      { label: "Services", href: "/services", icon: Layers },
      { label: "Packages", href: "/packages", icon: Package },
      { label: "Mentors", href: "/mentors", icon: Users },
    ],
  },
  {
    heading: "Tools",
    items: [
      { label: "All Tools", href: "/tools", icon: Wrench },
      { label: "GHL Audit", href: "/tools/ghl-audit", icon: Activity, badge: "New" },
      { label: "Revenue Tools", href: "/tools/revenue-audit", icon: BarChart3 },
    ],
  },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed top-0 left-0 bottom-0 z-50 flex w-[310px] flex-col bg-[#0c0a17]/97 backdrop-blur-xl border-r border-white/[0.08] md:hidden"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-4">
              <div className="flex items-center gap-2.5">
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[9px] bg-white/[0.06] ring-1 ring-white/[0.1]">
                  <Image src="/aj-logo.webp" alt="AJ" fill className="object-contain p-1" />
                </span>
                <span className="text-[13px] font-extrabold leading-tight text-white">
                  System Built <span className="text-yellow">By AJ</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Groups, scrollable so the footer stays reachable */}
            <nav className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {navGroups.map((group) => (
                <div key={group.heading} className="mb-6 last:mb-2">
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {group.heading}
                  </p>

                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      // Hash links share a pathname with their parent page, so
                      // matching on pathname alone would light up two rows.
                      const active = !item.href.includes("#") && pathname === item.href;
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-[15px] font-semibold transition-colors ${
                            active
                              ? "border-yellow bg-white/[0.07] text-white"
                              : "border-transparent text-white/70 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] shrink-0 ${active ? "text-yellow" : "text-white/40"}`}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-full bg-yellow px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-black">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer, pinned below the scroll area */}
            <div className="shrink-0">
              <div className="px-4 pb-3">
                <Link
                  href="/consult"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-lg bg-yellow px-4 py-3 text-base font-bold text-black transition-colors hover:bg-yellow-dark"
                >
                  Free Consultation
                </Link>
              </div>

              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-3.5 transition-colors hover:bg-white/[0.04]"
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/[0.12]">
                  <Image src="/aj-profile.webp" alt="AJ Bactad" fill className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[13px] font-bold text-white">AJ Bactad</span>
                  <span className="block truncate text-[11px] text-white/45">Automation Builder</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
