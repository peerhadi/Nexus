"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewHeader({
  theme,
  siteType,
  brand,
  activePage,
  navigateTo,
  menuOpen,
  setMenuOpen,
}: {
  theme: Theme;
  siteType: SiteType;
  brand: string;
  activePage: string;
  navigateTo: NavigateTo;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  const navItems =
    siteType === "ecommerce"
      ? [
          { label: "Shop", href: "#shop" },
          { label: "Our story", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]
      : siteType === "portfolio"
        ? [
            { label: "Projects", href: "#projects" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ]
        : siteType === "restaurant"
          ? [
              { label: "Menu", href: "#menu" },
              { label: "Our story", href: "#about" },
              { label: "Visit us", href: "#contact" },
            ]
          : [
              { label: "Features", href: "#features" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ];

  const pageLinks = [
    { id: "top", label: "Home" },
    {
      id:
        siteType === "ecommerce"
          ? "shop"
          : siteType === "portfolio"
            ? "projects"
            : siteType === "restaurant"
              ? "menu"
              : "features",
      label:
        siteType === "ecommerce"
          ? "Shop"
          : siteType === "portfolio"
            ? "Work"
            : siteType === "restaurant"
              ? "Menu"
              : "Features",
    },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className="sticky top-0 z-30 flex min-h-12 items-center justify-between gap-3 border-b px-4 py-3 sm:px-6"
      style={{
        background: `${theme.surface}ed`,
        borderColor: theme.border,
        backdropFilter: "blur(14px)",
      }}
    >
      <button
        onClick={() => navigateTo("#top")}
        className="flex items-center gap-2 text-[12px] font-bold tracking-tight"
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px]"
          style={{
            background: theme.accent,
            color: theme.accentText,
          }}
        >
          {brand.charAt(0).toUpperCase()}
        </span>
        {brand}
      </button>

      <nav className="hidden items-center gap-4 md:flex">
        {pageLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(`#${item.id}`)}
            className="text-[10px] transition-opacity hover:opacity-60"
            style={{
              color: activePage === item.id ? theme.text : theme.muted,
              fontWeight: activePage === item.id ? 700 : 400,
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => navigateTo("#contact")}
        className="hidden rounded-full px-3 py-2 text-[10px] font-semibold sm:inline-flex"
        style={{
          background: theme.accent,
          color: theme.accentText,
        }}
      >
        {siteType === "ecommerce"
          ? "Shop now"
          : siteType === "restaurant"
            ? "Book a table"
            : siteType === "saas"
              ? "Get started"
              : "Work with me"}
        <ArrowUpRight size={12} className="ml-1" />
      </button>

      <button
        className="flex h-7 w-7 items-center justify-center rounded-full md:hidden"
        style={{ background: theme.background }}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-2 right-2 top-full z-40 grid gap-1 rounded-xl border p-2 shadow-lg md:hidden"
            style={{
              background: theme.surface,
              borderColor: theme.border,
            }}
          >
            {pageLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(`#${item.id}`)}
                className="rounded-lg px-3 py-2.5 text-left text-xs"
                style={{
                  background:
                    activePage === item.id
                      ? theme.background
                      : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo("#contact")}
              className="rounded-lg px-3 py-2.5 text-left text-xs font-semibold"
              style={{
                background: theme.accent,
                color: theme.accentText,
              }}
            >
              Get in touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
