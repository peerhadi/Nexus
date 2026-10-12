"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Eye,
  ImagePlus,
  Layers3,
  Monitor,
  Palette,
  RotateCcw,
  Sparkles,
  Smartphone,
  WandSparkles,
  X,
} from "lucide-react";
import JSZip from "jszip";

type SiteType = "ecommerce" | "portfolio" | "saas" | "restaurant";
type AnimationType = "rise" | "fade" | "stagger" | "float" | "none";
type ThemeType = "prism" | "midnight" | "earth" | "rose" | "mono" | "ocean";

type Theme = {
  name: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  border: string;
  hero: string;
};

const themes: Record<ThemeType, Theme> = {
  prism: {
    name: "Prism",
    background: "#f7f8f8",
    surface: "#ffffff",
    text: "#17191c",
    muted: "#73777f",
    accent: "#68e3ee",
    accentText: "#10272b",
    border: "#e5e8e9",
    hero: "linear-gradient(135deg, #effcfd 0%, #f8f7ff 55%, #ffffff 100%)",
  },
  midnight: {
    name: "Midnight",
    background: "#101114",
    surface: "#191b20",
    text: "#f6f5f2",
    muted: "#a2a4ad",
    accent: "#b3a0ff",
    accentText: "#19132d",
    border: "#303139",
    hero: "linear-gradient(135deg, #29213f 0%, #171b2a 60%, #111216 100%)",
  },
  earth: {
    name: "Earth",
    background: "#f4f0e8",
    surface: "#fffdf8",
    text: "#292d23",
    muted: "#777a6d",
    accent: "#b8c58a",
    accentText: "#26301c",
    border: "#e4dfd3",
    hero: "linear-gradient(135deg, #e9edda 0%, #f6efe3 70%, #fffdf8 100%)",
  },
  rose: {
    name: "Rose",
    background: "#fcf4f5",
    surface: "#ffffff",
    text: "#342329",
    muted: "#907d84",
    accent: "#f1b4c4",
    accentText: "#48232f",
    border: "#f0dfe4",
    hero: "linear-gradient(135deg, #fbe1e8 0%, #fff4f1 58%, #ffffff 100%)",
  },
  mono: {
    name: "Monochrome",
    background: "#f4f4f4",
    surface: "#ffffff",
    text: "#151515",
    muted: "#747474",
    accent: "#202020",
    accentText: "#ffffff",
    border: "#e2e2e2",
    hero: "linear-gradient(135deg, #e9e9e9 0%, #f7f7f7 58%, #ffffff 100%)",
  },
  ocean: {
    name: "Ocean",
    background: "#eef6fa",
    surface: "#ffffff",
    text: "#142b3b",
    muted: "#6d8594",
    accent: "#86d4ee",
    accentText: "#153344",
    border: "#d8e8ef",
    hero: "linear-gradient(135deg, #d9f2fb 0%, #edf7fc 58%, #ffffff 100%)",
  },
};

const siteTypes: {
  id: SiteType;
  label: string;
  description: string;
}[] = [
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Products, pricing and shopping CTAs",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Projects, personal story and contact",
  },
  {
    id: "saas",
    label: "SaaS / Startup",
    description: "Features, benefits and conversion CTAs",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    description: "Menu highlights, story and reservations",
  },
];

const animationOptions: {
  id: AnimationType;
  label: string;
  description: string;
}[] = [
  { id: "rise", label: "Smooth rise", description: "Elements rise into view" },
  { id: "fade", label: "Soft fade", description: "Subtle opacity transitions" },
  {
    id: "stagger",
    label: "Staggered",
    description: "Cards appear one after another",
  },
  { id: "float", label: "Float", description: "Gentle floating movement" },
  { id: "none", label: "No animation", description: "A clean, static layout" },
];

const stockImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85",
];

const projectImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
];

const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=85",
];

function getAnimation(animation: AnimationType, index = 0) {
  if (animation === "none") return {};

  if (animation === "fade") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.55, delay: index * 0.07 },
    };
  }

  if (animation === "stagger") {
    return {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.45,
        delay: Math.min(index * 0.1, 0.6),
        ease: "easeOut" as const,
      },
    };
  }

  if (animation === "float") {
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: [12, 0, -3, 0] },
      transition: {
        duration: 0.8,
        delay: index * 0.06,
        ease: "easeOut" as const,
      },
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: index * 0.06,
      ease: "easeOut" as const,
    },
  };
}

function PreviewButton({
  children,
  theme,
  secondary = false,
  onClick,
}: {
  children: React.ReactNode;
  theme: Theme;
  secondary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold transition duration-200 hover:-translate-y-0.5"
      style={{
        background: secondary ? theme.surface : theme.accent,
        color: secondary ? theme.text : theme.accentText,
        border: `1px solid ${secondary ? theme.border : theme.accent}`,
      }}
    >
      {children}
    </button>
  );
}

function WebsitePreview({
  siteType,
  theme,
  animation,
  keywords,
  uploadedImages,
  showCta,
  siteName,
}: {
  siteType: SiteType;
  theme: Theme;
  animation: AnimationType;
  keywords: string;
  uploadedImages: string[];
  showCta: boolean;
  siteName: string;
}) {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const words = keywords
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);

  const brand = siteName.trim() || "FORMA";
  const images = uploadedImages.length ? uploadedImages : [];

  const products = [
    {
      name: "Studio Runner",
      category: "Everyday collection",
      price: "$89.00",
      tag: "BESTSELLER",
    },
    {
      name: "Form Watch",
      category: "Designed for daily use",
      price: "$129.00",
      tag: "NEW ARRIVAL",
    },
    {
      name: "Studio Headphones",
      category: "Sound, refined",
      price: "$149.00",
      tag: "POPULAR",
    },
    {
      name: "Capture Camera",
      category: "Made for the moment",
      price: "$219.00",
      tag: "LIMITED",
    },
  ];

  const portfolio = [
    {
      title: "Form & Function",
      category: "Brand identity",
      image: projectImages[0],
    },
    {
      title: "Objects of Note",
      category: "Digital experience",
      image: projectImages[1],
    },
    {
      title: "Open Studio",
      category: "Art direction",
      image: projectImages[2],
    },
  ];

  const menuItems = [
    {
      name: "Seasonal greens",
      description: "Herbs, citrus, toasted seeds",
      price: "$14",
    },
    {
      name: "House-made pasta",
      description: "Brown butter, sage, parmesan",
      price: "$22",
    },
    {
      name: "Roasted market fish",
      description: "Garden vegetables, lemon oil",
      price: "$26",
    },
  ];

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

  const [activePage, setActivePage] = useState("top");

  const navigateTo = (href: string) => {
    setActivePage(href.replace("#", ""));
    setMenuOpen(false);
  };

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
    <div
      className="overflow-hidden rounded-[18px] border shadow-2xl"
      style={{
        background: theme.background,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div
        className="flex h-11 items-center justify-between border-b px-3"
        style={{ background: theme.surface, borderColor: theme.border }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff6259]" />
          <span className="h-2 w-2 rounded-full bg-[#ffc044]" />
          <span className="h-2 w-2 rounded-full bg-[#36c96f]" />
        </div>

        <div
          className="flex max-w-[55%] items-center gap-2 truncate rounded-full px-3 py-1 text-[9px]"
          style={{ background: theme.background, color: theme.muted }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {brand.toLowerCase().replace(/\s+/g, "")}.studio
        </div>

        <button
          onClick={() => setMobile(!mobile)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px]"
          style={{ color: theme.muted }}
        >
          {mobile ? <Monitor size={13} /> : <Smartphone size={13} />}
          {mobile ? "Desktop" : "Mobile"}
        </button>
      </div>

      <div
        className="flex justify-center p-2 sm:p-3 h-full"
        style={{ background: theme.background }}
        id="design-lab-site"
      >
        <div
          className="relative overflow-hidden rounded-xl border transition-all duration-300"
          id="scrollContainer"
          style={{
            width: mobile ? "min(100%, 340px)" : "100%",
            height: "min(70vh, 680px)",
            minHeight: "440px",
            borderColor: theme.border,
            background: theme.surface,
          }}
        >
          <div
            className="h-full overflow-y-auto overscroll-contain"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.muted} transparent`,
            }}
          >
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

            <AnimatePresence mode="wait">
              <motion.main
                key={activePage}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-[520px] flex-col"
              >
                {activePage === "top" && (
                  <>
                    <section
                      className="relative flex min-h-[310px] flex-col justify-center overflow-hidden px-5 py-10 sm:px-8"
                      style={{ background: theme.hero }}
                    >
                      <div className="relative z-10 max-w-[470px]">
                        <span
                          className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
                          style={{
                            borderColor: theme.border,
                            background: theme.surface,
                            color: theme.muted,
                          }}
                        >
                          <Sparkles size={11} />
                          {siteType === "ecommerce"
                            ? "The everyday edit"
                            : siteType === "portfolio"
                              ? "Independent creative studio"
                              : siteType === "restaurant"
                                ? "Fresh from our kitchen"
                                : "A better way to work"}
                        </span>

                        <h1 className="max-w-[420px] text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                          {siteType === "ecommerce" ? (
                            <>
                              Good things.
                              <br />
                              <span style={{ color: theme.muted }}>
                                Made to last.
                              </span>
                            </>
                          ) : siteType === "portfolio" ? (
                            <>
                              Thoughtful work.
                              <br />
                              <span style={{ color: theme.muted }}>
                                Meaningful impact.
                              </span>
                            </>
                          ) : siteType === "restaurant" ? (
                            <>
                              A little closer
                              <br />
                              <span style={{ color: theme.muted }}>
                                to the good stuff.
                              </span>
                            </>
                          ) : (
                            <>
                              Less busywork.
                              <br />
                              <span style={{ color: theme.muted }}>
                                More momentum.
                              </span>
                            </>
                          )}
                        </h1>

                        <p
                          className="mt-4 max-w-[350px] text-[11px] leading-[1.9] sm:text-xs"
                          style={{ color: theme.muted }}
                        >
                          {siteType === "ecommerce"
                            ? "Everyday essentials, considered materials, and pieces made to stay in your rotation."
                            : siteType === "portfolio"
                              ? "A small independent practice building memorable identities and useful digital experiences."
                              : siteType === "restaurant"
                                ? "Seasonal ingredients, thoughtful cooking, and a warm welcome at every table."
                                : "Bring your projects, people, and everyday workflows together in one clear workspace."}
                        </p>

                        {words.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {words.slice(0, 3).map((word) => (
                              <span
                                key={word}
                                className="rounded-full border px-2.5 py-1 text-[9px]"
                                style={{
                                  borderColor: theme.border,
                                  background: theme.surface,
                                  color: theme.muted,
                                }}
                              >
                                {word}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              navigateTo(
                                siteType === "ecommerce"
                                  ? "#shop"
                                  : siteType === "portfolio"
                                    ? "#projects"
                                    : siteType === "restaurant"
                                      ? "#menu"
                                      : "#features",
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold"
                            style={{
                              background: theme.accent,
                              color: theme.accentText,
                            }}
                          >
                            {siteType === "ecommerce"
                              ? "Explore the collection"
                              : siteType === "portfolio"
                                ? "View selected work"
                                : siteType === "restaurant"
                                  ? "Explore the menu"
                                  : "Explore the platform"}
                            <ArrowRight size={13} />
                          </button>

                          <button
                            onClick={() => navigateTo("#about")}
                            className="inline-flex items-center gap-2 rounded-full border px-4 py-3 text-[10px] font-semibold"
                            style={{ borderColor: theme.border }}
                          >
                            Our story
                            <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </div>

                      <div
                        className="pointer-events-none absolute -right-12 top-4 hidden h-56 w-56 rounded-full sm:block"
                        style={{
                          background: `radial-gradient(circle, ${theme.accent}55, transparent 70%)`,
                        }}
                      />
                    </section>

                    <section className="px-5 py-6 sm:px-7">
                      <div className="mb-4 flex items-end justify-between gap-3">
                        <div>
                          <p
                            className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: theme.muted }}
                          >
                            {siteType === "ecommerce"
                              ? "Customer favourites"
                              : siteType === "portfolio"
                                ? "Selected projects"
                                : siteType === "restaurant"
                                  ? "From the kitchen"
                                  : "Everything in sync"}
                          </p>
                          <h2 className="mt-1 text-lg font-semibold tracking-tight">
                            {siteType === "ecommerce"
                              ? "The pieces people love."
                              : siteType === "portfolio"
                                ? "A few things we've made."
                                : siteType === "restaurant"
                                  ? "Made fresh, served with care."
                                  : "Good work, without the chaos."}
                          </h2>
                        </div>
                        <button
                          onClick={() =>
                            navigateTo(
                              siteType === "ecommerce"
                                ? "#shop"
                                : siteType === "portfolio"
                                  ? "#projects"
                                  : siteType === "restaurant"
                                    ? "#menu"
                                    : "#features",
                            )
                          }
                          className="shrink-0 text-[10px] font-semibold"
                          style={{ color: theme.muted }}
                        >
                          View all{" "}
                          <ArrowRight className="ml-1 inline" size={12} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {(siteType === "ecommerce"
                          ? products.slice(0, 2)
                          : siteType === "portfolio"
                            ? portfolio.slice(0, 2)
                            : siteType === "restaurant"
                              ? menuItems.slice(0, 2)
                              : [
                                  {
                                    name: "Project planning",
                                    category: "Organised workflows",
                                    price: "01",
                                    description:
                                      "A clearer view of what's next.",
                                    title: "Project planning",
                                  },
                                  {
                                    name: "Team workspace",
                                    category: "Better collaboration",
                                    price: "02",
                                    description:
                                      "Keep the important things together.",
                                    title: "Team workspace",
                                  },
                                ]
                        ).map((item, index) => (
                          <article
                            key={"name" in item ? item.name : item.title}
                            className="min-w-0 overflow-hidden rounded-xl border"
                            style={{
                              borderColor: theme.border,
                              background: theme.surface,
                            }}
                          >
                            {siteType !== "saas" && (
                              <div className="aspect-[1.5/1] overflow-hidden">
                                <img
                                  src={
                                    images[index] ||
                                    (siteType === "ecommerce"
                                      ? stockImages[index]
                                      : siteType === "portfolio"
                                        ? portfolio[index]?.image
                                        : restaurantImages[index + 1])
                                  }
                                  alt={"name" in item ? item.name : item.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-3">
                              <p
                                className="text-[9px]"
                                style={{ color: theme.muted }}
                              >
                                {"category" in item
                                  ? item.category
                                  : "Workspace"}
                              </p>
                              <h3 className="mt-1 truncate text-[11px] font-semibold">
                                {"name" in item ? item.name : item.title}
                              </h3>
                              <p
                                className="mt-1 text-[9px]"
                                style={{ color: theme.muted }}
                              >
                                {"price" in item
                                  ? item.price
                                  : "Designed with intention"}
                              </p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section
                      className="mx-5 mb-5 rounded-xl border p-4 sm:mx-7"
                      style={{
                        borderColor: theme.border,
                        background: theme.hero,
                      }}
                    >
                      <p
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: theme.muted }}
                      >
                        The difference
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {[
                          ["01", "Thoughtful", "Every detail has a purpose."],
                          ["02", "Practical", "Made for everyday use."],
                          ["03", "Personal", "Built around real people."],
                        ].map(([number, title, description]) => (
                          <div key={number}>
                            <span
                              className="text-[9px]"
                              style={{ color: theme.muted }}
                            >
                              {number}
                            </span>
                            <h3 className="mt-1 text-[10px] font-semibold">
                              {title}
                            </h3>
                            <p
                              className="mt-1 text-[9px] leading-relaxed"
                              style={{ color: theme.muted }}
                            >
                              {description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {(activePage === "shop" ||
                  activePage === "projects" ||
                  activePage === "menu" ||
                  activePage === "features") && (
                  <section className="flex-1 px-5 py-7 sm:px-7">
                    <button
                      onClick={() => navigateTo("#top")}
                      className="mb-5 inline-flex items-center gap-1.5 text-[10px]"
                      style={{ color: theme.muted }}
                    >
                      <ArrowLeft size={12} /> Back home
                    </button>

                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: theme.muted }}
                    >
                      {siteType === "ecommerce"
                        ? "The collection"
                        : siteType === "portfolio"
                          ? "Our work"
                          : siteType === "restaurant"
                            ? "Food and drink"
                            : "The platform"}
                    </p>

                    <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                      {siteType === "ecommerce"
                        ? "Everyday, considered."
                        : siteType === "portfolio"
                          ? "Work with a point of view."
                          : siteType === "restaurant"
                            ? "A menu worth lingering over."
                            : "Everything your team needs."}
                    </h1>

                    <p
                      className="mt-2 max-w-md text-[10px] leading-relaxed"
                      style={{ color: theme.muted }}
                    >
                      {siteType === "ecommerce"
                        ? "Discover considered essentials, made with quality materials and designed to be used often."
                        : siteType === "portfolio"
                          ? "A selection of projects made in close collaboration with ambitious, thoughtful teams."
                          : siteType === "restaurant"
                            ? "A seasonal selection from our kitchen, made fresh with ingredients from trusted local suppliers."
                            : "A focused set of tools to plan projects, keep conversations connected, and understand progress."}
                    </p>

                    {siteType === "ecommerce" && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {[
                          ...products,
                          {
                            name: "Studio Everyday Tote",
                            category: "Accessories",
                            price: "$28",
                            tag: "BESTSELLER",
                          },
                          {
                            name: "Weekend Travel Kit",
                            category: "Travel",
                            price: "$46",
                            tag: "NEW ARRIVAL",
                          },
                        ].map((product, index) => (
                          <article
                            key={`${product.name}-${index}`}
                            className="overflow-hidden rounded-xl border"
                            style={{ borderColor: theme.border }}
                          >
                            <div className="relative aspect-[4/4.4] overflow-hidden">
                              <img
                                src={
                                  images[index % Math.max(images.length, 1)] ||
                                  stockImages[index % stockImages.length]
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                              <span
                                className="absolute left-2 top-2 rounded-full px-2 py-1 text-[7px] font-semibold"
                                style={{
                                  background: theme.surface,
                                  color: theme.text,
                                }}
                              >
                                {product.tag || "STUDIO PICK"}
                              </span>
                            </div>
                            <div className="p-3">
                              <p
                                className="text-[9px]"
                                style={{ color: theme.muted }}
                              >
                                {product.category}
                              </p>
                              <h3 className="mt-1 text-[11px] font-semibold">
                                {product.name}
                              </h3>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-[11px] font-semibold">
                                  {product.price}
                                </span>
                                <button
                                  onClick={() => navigateTo("#contact")}
                                  className="rounded-full border px-2.5 py-1.5 text-[9px]"
                                  style={{ borderColor: theme.border }}
                                >
                                  Details{" "}
                                  <ArrowUpRight
                                    className="ml-1 inline"
                                    size={10}
                                  />
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {siteType === "portfolio" && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {[
                          ...portfolio,
                          {
                            title: "Northstar Journal",
                            category: "Editorial",
                            image: stockImages[2],
                          },
                          {
                            title: "Fieldwork Identity",
                            category: "Brand identity",
                            image: stockImages[3],
                          },
                        ].map((project, index) => (
                          <article
                            key={`${project.title}-${index}`}
                            className="overflow-hidden rounded-xl border"
                            style={{ borderColor: theme.border }}
                          >
                            <div className="aspect-[1.25/1] overflow-hidden">
                              <img
                                src={images[index] || project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <p
                                className="text-[9px]"
                                style={{ color: theme.muted }}
                              >
                                {project.category}
                              </p>
                              <h3 className="mt-1 text-[11px] font-semibold">
                                {project.title}
                              </h3>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {siteType === "restaurant" && (
                      <div className="mt-6 space-y-3">
                        {[
                          ...menuItems,
                          {
                            name: "Wild Mushroom Risotto",
                            price: "$18",
                            description:
                              "Slow-cooked arborio rice, roasted mushrooms, herbs and aged parmesan.",
                          },
                          {
                            name: "Vanilla Bean Panna Cotta",
                            price: "$9",
                            description:
                              "Silky vanilla cream, seasonal berries and a bright citrus finish.",
                          },
                        ].map((item, index) => (
                          <article
                            key={`${item.name}-${index}`}
                            className="flex items-start gap-3 border-b pb-3"
                            style={{ borderColor: theme.border }}
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                              <img
                                src={
                                  images[index % Math.max(images.length, 1)] ||
                                  restaurantImages[
                                    index % restaurantImages.length
                                  ]
                                }
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-[11px] font-semibold">
                                  {item.name}
                                </h3>
                                <span className="shrink-0 text-[10px] font-semibold">
                                  {item.price}
                                </span>
                              </div>
                              <p
                                className="mt-1 text-[9px] leading-relaxed"
                                style={{ color: theme.muted }}
                              >
                                {item.description}
                              </p>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {siteType === "saas" && (
                      <div className="mt-6 space-y-3">
                        {[
                          [
                            "01",
                            "Projects that stay organised",
                            "Track owners, deadlines, milestones, and decisions in one shared space.",
                          ],
                          [
                            "02",
                            "Conversations with context",
                            "Keep updates connected to the work instead of scattered across tools.",
                          ],
                          [
                            "03",
                            "A clearer daily plan",
                            "Give everyone a practical overview of priorities and what needs attention.",
                          ],
                          [
                            "04",
                            "Progress you can understand",
                            "See activity, completed work, and upcoming milestones without the noise.",
                          ],
                        ].map(([number, title, description]) => (
                          <article
                            key={number}
                            className="flex gap-3 rounded-xl border p-4"
                            style={{
                              borderColor: theme.border,
                              background: theme.surface,
                            }}
                          >
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold"
                              style={{
                                background: theme.accent,
                                color: theme.accentText,
                              }}
                            >
                              {number}
                            </span>
                            <div>
                              <h3 className="text-[11px] font-semibold">
                                {title}
                              </h3>
                              <p
                                className="mt-1 text-[10px] leading-relaxed"
                                style={{ color: theme.muted }}
                              >
                                {description}
                              </p>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    <div
                      className="mt-6 flex items-center justify-between gap-3 rounded-xl p-4"
                      style={{ background: theme.hero }}
                    >
                      <div>
                        <h3 className="text-[11px] font-semibold">
                          Have a question?
                        </h3>
                        <p
                          className="mt-1 text-[9px]"
                          style={{ color: theme.muted }}
                        >
                          We're happy to help you find the right fit.
                        </p>
                      </div>
                      <button
                        onClick={() => navigateTo("#contact")}
                        className="shrink-0 rounded-full px-3 py-2 text-[9px] font-semibold"
                        style={{
                          background: theme.accent,
                          color: theme.accentText,
                        }}
                      >
                        Get in touch{" "}
                        <ArrowRight className="ml-1 inline" size={11} />
                      </button>
                    </div>
                  </section>
                )}

                {activePage === "about" && (
                  <section className="flex-1 px-5 py-7 sm:px-7">
                    <button
                      onClick={() => navigateTo("#top")}
                      className="mb-5 inline-flex items-center gap-1.5 text-[10px]"
                      style={{ color: theme.muted }}
                    >
                      <ArrowLeft size={12} /> Back home
                    </button>

                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: theme.muted }}
                    >
                      Our story
                    </p>
                    <h1 className="mt-2 max-w-lg text-2xl font-semibold leading-tight tracking-tight">
                      {siteType === "ecommerce"
                        ? "Fewer things. Better things."
                        : siteType === "portfolio"
                          ? "Good work starts with good questions."
                          : siteType === "restaurant"
                            ? "A neighbourhood place, made with care."
                            : "Built around how people work."}
                    </h1>
                    <p
                      className="mt-3 max-w-lg text-[10px] leading-[1.9]"
                      style={{ color: theme.muted }}
                    >
                      {siteType === "ecommerce"
                        ? `${brand} began with a simple idea: everyday products should be useful, well made, and enjoyable to live with. We work with considered materials and trusted makers to create things that earn their place.`
                        : siteType === "portfolio"
                          ? `${brand} is an independent creative practice led by Alex Morgan and a close network of collaborators. We partner with people who care about the details, from the first conversation to the final launch.`
                          : siteType === "restaurant"
                            ? `${brand} was started by chef Olivia Bennett and host Daniel Reed with a simple goal: serve thoughtful seasonal food in a place where everyone feels welcome.`
                            : `${brand} was created to make everyday work feel more connected. We believe teams do their best work when plans, conversations, and decisions live in one clear place.`}
                    </p>

                    <div
                      className="mt-5 overflow-hidden rounded-xl"
                      style={{ background: theme.hero }}
                    >
                      <img
                        src={images[0] || stockImages[0]}
                        alt={`${brand} studio`}
                        className="h-36 w-full object-cover sm:h-44"
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {[
                        {
                          title: "Thoughtful by design",
                          text: "Every decision has a reason, from the materials we choose to the details people notice first.",
                        },
                        {
                          title: "People come first",
                          text: "Good work grows from honest conversations, trust, and paying attention to real needs.",
                        },
                        {
                          title: "Built for the long run",
                          text: "We value quality, clarity, and solutions that remain useful beyond the first impression.",
                        },
                        {
                          title: "Always improving",
                          text: "We learn from the people who use what we make and carry those lessons into every next step.",
                        },
                      ].map((item) => (
                        <article
                          key={item.title}
                          className="rounded-xl border p-3"
                          style={{ borderColor: theme.border }}
                        >
                          <h3 className="text-[10px] font-semibold">
                            {item.title}
                          </h3>
                          <p
                            className="mt-2 text-[9px] leading-relaxed"
                            style={{ color: theme.muted }}
                          >
                            {item.text}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {["AM", "OB", "DR"].map((initials, index) => (
                          <span
                            key={initials}
                            className="flex h-8 w-8 items-center justify-center rounded-full border text-[9px] font-semibold"
                            style={{
                              background:
                                index === 1 ? theme.accent : theme.hero,
                              borderColor: theme.surface,
                              color:
                                index === 1 ? theme.accentText : theme.text,
                            }}
                          >
                            {initials}
                          </span>
                        ))}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold">
                          A small team with a shared point of view.
                        </p>
                        <p
                          className="mt-1 text-[9px]"
                          style={{ color: theme.muted }}
                        >
                          Alex Morgan · Olivia Bennett · Daniel Reed
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {activePage === "contact" && (
                  <section className="flex-1 px-5 py-7 sm:px-7">
                    <button
                      onClick={() => navigateTo("#top")}
                      className="mb-5 inline-flex items-center gap-1.5 text-[10px]"
                      style={{ color: theme.muted }}
                    >
                      <ArrowLeft size={12} /> Back home
                    </button>

                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: theme.muted }}
                    >
                      Let's talk
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                      {siteType === "restaurant"
                        ? "Come spend some time with us."
                        : siteType === "ecommerce"
                          ? "Need a hand finding something?"
                          : siteType === "portfolio"
                            ? "Have a good project in mind?"
                            : "Ready to make work flow?"}
                    </h1>
                    <p
                      className="mt-2 max-w-md text-[10px] leading-relaxed"
                      style={{ color: theme.muted }}
                    >
                      {siteType === "restaurant"
                        ? "Ask about a reservation, an upcoming event, or anything on the menu. We'd love to hear from you."
                        : siteType === "ecommerce"
                          ? "Questions about an order, product details, or delivery? Our small support team is here to help."
                          : siteType === "portfolio"
                            ? "Tell us a little about your idea, what you're trying to solve, and where you'd like to take it."
                            : "Tell us what your team is working on. We'll help you find a practical way to get started."}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_0.85fr]">
                      <form
                        className="space-y-3"
                        onSubmit={(event) => {
                          event.preventDefault();
                          window.alert(
                            "This is a design preview. Connect a form endpoint to receive real submissions.",
                          );
                        }}
                      >
                        <div>
                          <label className="mb-1.5 block text-[9px] font-medium">
                            Your name
                          </label>
                          <input
                            required
                            placeholder="Jordan Taylor"
                            className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
                            style={{
                              borderColor: theme.border,
                              background: theme.background,
                              color: theme.text,
                            }}
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[9px] font-medium">
                            Email address
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="jordan@example.com"
                            className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
                            style={{
                              borderColor: theme.border,
                              background: theme.background,
                              color: theme.text,
                            }}
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[9px] font-medium">
                            What can we help with?
                          </label>
                          <select
                            className="w-full rounded-lg border px-3 py-2.5 text-[10px] outline-none"
                            style={{
                              borderColor: theme.border,
                              background: theme.background,
                              color: theme.text,
                            }}
                          >
                            <option>General enquiry</option>
                            <option>Products and pricing</option>
                            <option>Project collaboration</option>
                            <option>Reservations and events</option>
                            <option>Technical support</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[9px] font-medium">
                            Your message
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Tell us a little about what you have in mind..."
                            className="w-full resize-none rounded-lg border px-3 py-2.5 text-[10px] outline-none"
                            style={{
                              borderColor: theme.border,
                              background: theme.background,
                              color: theme.text,
                            }}
                          />
                        </div>

                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold"
                          style={{
                            background: theme.accent,
                            color: theme.accentText,
                          }}
                        >
                          Send enquiry <ArrowUpRight size={12} />
                        </button>
                      </form>

                      <div className="space-y-3">
                        <div
                          className="rounded-xl p-4"
                          style={{ background: theme.hero }}
                        >
                          <span
                            className="text-[9px]"
                            style={{ color: theme.muted }}
                          >
                            EMAIL
                          </span>
                          <p className="mt-1 text-[10px] font-semibold">
                            hello@{brand.toLowerCase().replace(/\s+/g, "")}
                            .studio
                          </p>
                          <p
                            className="mt-1 text-[9px]"
                            style={{ color: theme.muted }}
                          >
                            Replies within 1–2 working days
                          </p>
                        </div>

                        <div
                          className="rounded-xl border p-4"
                          style={{ borderColor: theme.border }}
                        >
                          <span
                            className="text-[9px]"
                            style={{ color: theme.muted }}
                          >
                            {siteType === "restaurant" ? "FIND US" : "STUDIO"}
                          </span>
                          <p className="mt-1 text-[10px] font-semibold">
                            {siteType === "restaurant"
                              ? "18 Willow Street"
                              : "Independent by nature"}
                          </p>
                          <p
                            className="mt-1 text-[9px] leading-relaxed"
                            style={{ color: theme.muted }}
                          >
                            {siteType === "restaurant"
                              ? "Brooklyn, New York · Open Tuesday–Sunday"
                              : "Working with thoughtful people, wherever they are."}
                          </p>
                        </div>

                        <div
                          className="rounded-xl border p-4"
                          style={{ borderColor: theme.border }}
                        >
                          <span
                            className="text-[9px]"
                            style={{ color: theme.muted }}
                          >
                            RESPONSE TIME
                          </span>
                          <p className="mt-1 text-[10px] font-semibold">
                            Usually within two days
                          </p>
                          <p
                            className="mt-1 text-[9px]"
                            style={{ color: theme.muted }}
                          >
                            A real person will get back to you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <footer
                  className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 text-[9px] sm:px-6"
                  style={{ borderColor: theme.border, color: theme.muted }}
                >
                  <span>© 2026 {brand}. Made with intention.</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => navigateTo("#about")}>About</button>
                    <button onClick={() => navigateTo("#contact")}>
                      Contact
                    </button>
                    <button onClick={() => navigateTo("#top")}>Home ↑</button>
                  </div>
                </footer>
              </motion.main>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesignLabPage() {
  const [siteType, setSiteType] = useState<SiteType>("ecommerce");
  const [themeType, setThemeType] = useState<ThemeType>("prism");
  const [animation, setAnimation] = useState<AnimationType>("rise");
  const [keywords, setKeywords] = useState("modern, thoughtful, premium");
  const [siteName, setSiteName] = useState("FORMA");
  const [showCta, setShowCta] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [generated, setGenerated] = useState(0);
  const [showOptions, setShowOptions] = useState(true);

  const theme = themes[themeType];

  const currentSite = useMemo(
    () => siteTypes.find((item) => item.id === siteType)!,
    [siteType],
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const urls = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, Math.max(0, 4 - uploadedImages.length))
      .map((file) => URL.createObjectURL(file));

    setUploadedImages((current) => [...current, ...urls].slice(0, 4));
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setUploadedImages((current) => {
      const removed = current[index];
      if (removed?.startsWith("blob:")) URL.revokeObjectURL(removed);
      return current.filter((_, imageIndex) => imageIndex !== index);
    });
  };

  const reset = () => {
    setSiteType("ecommerce");
    setThemeType("prism");
    setAnimation("rise");
    setKeywords("modern, thoughtful, premium");
    setSiteName("FORMA");
    setShowCta(true);
    setGenerated((current) => current + 1);
  };

  const exportWebsite = async () => {
    const preview = document.querySelector(
      "#design-lab-site",
    ) as HTMLElement | null;
    if (!preview) return;

    const zip = new JSZip();
    const clone = preview.cloneNode(true) as HTMLElement;

    const computed = getComputedStyle(preview);

    for (let i = 0; i < computed.length; i++) {
      const property = computed[i];

      if (property.startsWith("--")) {
        clone.style.setProperty(
          property,
          computed.getPropertyValue(property),
          computed.getPropertyPriority(property),
        );
      }
    }

    clone.style.fontFamily = computed.fontFamily;
    clone.style.color = computed.color;
    clone.style.backgroundColor = computed.backgroundColor;
    clone.style.width = "100%";
    clone.style.height = "auto";
    clone.style.minHeight = "100vh";
    clone.style.overflow = "visible";
    clone.style.maxWidth = "none";
    clone.removeAttribute("id");
    clone.querySelectorAll("button").forEach((button) => {
      button.removeAttribute("onclick");
    });
    const originalElements = [
      preview,
      ...Array.from(preview.querySelectorAll("*")),
    ];

    const clonedElements = [clone, ...Array.from(clone.querySelectorAll("*"))];

    originalElements.forEach((original, index) => {
      const cloned = clonedElements[index] as HTMLElement | undefined;
      if (!cloned) return;

      const styles = getComputedStyle(original);

      [
        "color",
        "backgroundColor",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "lineHeight",
        "letterSpacing",
        "borderColor",
        "borderRadius",
        "boxShadow",
        "opacity",
      ].forEach((property) => {
        const cssProperty = property.replace(
          /[A-Z]/g,
          (letter) => `-${letter.toLowerCase()}`,
        );

        cloned.style.setProperty(
          cssProperty,
          styles.getPropertyValue(cssProperty),
        );
      });
    });
    const images = Array.from(clone.querySelectorAll("img"));

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      if (img.src.startsWith("blob:")) {
        try {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const extension = blob.type.split("/")[1] || "png";
          const filename = `image-${i + 1}.${extension}`;

          zip.file(`assets/${filename}`, blob);
          img.src = `assets/${filename}`;
        } catch {
          img.removeAttribute("src");
        }
      }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${siteName || "My Website"}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

body {
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

#site-root {
  min-height: 100vh;
  width: 100%;
}
#scrollContainer {
  min-height: 100vh !important;
}
img {
  max-width: 100%;
}
</style>
</head>
<body>
<main id="site-root">${clone.innerHTML}</main>
</body>
</html>`;

    zip.file("index.html", html);

    const file = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${(siteName || "website").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.zip`;
    link.click();

    URL.revokeObjectURL(url);
  };
  return (
    <main
      className="min-h-screen "
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <div className="pointer-events-none fixed inset-0 -z-0 ">
        <div
          className="absolute -left-40 top-20 h-96 w-96 rounded-full opacity-20 blur-[100px]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -right-40 top-[35%] h-96 w-96 rounded-full opacity-20 blur-[110px]"
          style={{ background: "var(--gradient-secondary)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end mt-25"
        >
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
              Turn an idea into a{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                visual direction.
              </span>
            </h1>
            <p
              className="mt-3 max-w-2xl text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              Choose a site type, set the visual mood, add your own imagery, and
              preview a complete responsive layout.
            </p>
          </div>

          <button
            onClick={reset}
            className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:-translate-y-0.5"
            style={{
              borderColor: "var(--accent)",
              background: "var(--background)",
            }}
          >
            <RotateCcw size={14} />
            Reset lab
          </button>
        </motion.div>

        <div className="grid items-start gap-5 xl:grid-cols-[310px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="sticky top-0 h-screen min-h-0 overflow-y-auto rounded-2xl border"
            style={{
              borderColor: "var(--accent)",
              background: "var(--background)",
            }}
          >
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex w-full items-center justify-between border-b p-5 text-left"
              style={{ borderColor: "var(--accent)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "var(--gradient-secondary)" }}
                >
                  <Palette size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Design controls</p>
                  <p
                    className="mt-1 text-[11px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Make it yours
                  </p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${showOptions ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {showOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 p-5">
                    <section>
                      <div className="mb-3 flex items-center justify-between">
                        <label className="text-xs font-semibold">
                          01 / Website type
                        </label>
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Required
                        </span>
                      </div>

                      <div className="grid gap-2">
                        {siteTypes.map((item) => {
                          const active = siteType === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={() => setSiteType(item.id)}
                              className="group flex items-center gap-3 rounded-xl border p-3 text-left transition duration-200 hover:-translate-y-0.5"
                              style={{
                                borderColor: active
                                  ? "var(--accent)"
                                  : "var(--background)",
                                background: active
                                  ? "var(--gradient-secondary)"
                                  : "transparent",
                              }}
                            >
                              <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                style={{
                                  background: active
                                    ? "var(--gradient-primary)"
                                    : "var(--background)",
                                }}
                              >
                                {item.id === "ecommerce" ? (
                                  <Layers3 size={16} />
                                ) : item.id === "portfolio" ? (
                                  <Eye size={16} />
                                ) : item.id === "saas" ? (
                                  <Code2 size={16} />
                                ) : (
                                  <Sparkles size={16} />
                                )}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold">
                                  {item.label}
                                </span>
                                <span
                                  className="mt-1 block text-[10px] leading-relaxed"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  {item.description}
                                </span>
                              </span>

                              <span
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
                                style={{
                                  borderColor: active
                                    ? "var(--accent)"
                                    : "var(--text-secondary)",
                                  background: active
                                    ? "var(--accent)"
                                    : "transparent",
                                }}
                              >
                                {active && <Check size={12} />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <div
                      className="h-px"
                      style={{ background: "var(--accent)", opacity: 0.6 }}
                    />

                    <section>
                      <label className="mb-3 block text-xs font-semibold">
                        02 / Brand identity
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="site-name"
                            className="mb-1.5 block text-[11px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Website name
                          </label>
                          <input
                            id="site-name"
                            value={siteName}
                            onChange={(event) =>
                              setSiteName(event.target.value)
                            }
                            maxLength={28}
                            placeholder="e.g. Forma Studio"
                            className="w-full rounded-xl border px-3 py-2.5 text-xs outline-none transition focus:ring-2"
                            style={{
                              borderColor: "var(--accent)",
                              background: "var(--background)",
                              color: "var(--text-primary)",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="site-keywords"
                            className="mb-1.5 block text-[11px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Keywords and mood
                          </label>
                          <textarea
                            id="site-keywords"
                            value={keywords}
                            onChange={(event) =>
                              setKeywords(event.target.value)
                            }
                            rows={3}
                            maxLength={180}
                            placeholder="modern, playful, premium..."
                            className="w-full resize-y rounded-xl border px-3 py-2.5 text-xs leading-relaxed outline-none transition focus:ring-2"
                            style={{
                              borderColor: "var(--accent)",
                              background: "var(--background)",
                              color: "var(--text-primary)",
                            }}
                          />
                          <p
                            className="mt-1.5 text-[10px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Separate keywords with commas.
                          </p>
                        </div>
                      </div>
                    </section>

                    <div
                      className="h-px"
                      style={{ background: "var(--accent)", opacity: 0.6 }}
                    />

                    <section>
                      <label className="mb-3 block text-xs font-semibold">
                        03 / Colour theme
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(Object.entries(themes) as [ThemeType, Theme][]).map(
                          ([id, item]) => {
                            const active = themeType === id;

                            return (
                              <button
                                key={id}
                                onClick={() => setThemeType(id)}
                                className="rounded-xl border p-2 text-left transition duration-200 hover:-translate-y-0.5"
                                style={{
                                  borderColor: active
                                    ? "var(--accent)"
                                    : "var(--background)",
                                  background: active
                                    ? "var(--gradient-secondary)"
                                    : "transparent",
                                }}
                              >
                                <span
                                  className="mb-2 flex h-9 items-end gap-1 overflow-hidden rounded-lg p-1"
                                  style={{ background: item.background }}
                                >
                                  <span
                                    className="h-full w-1/2 rounded"
                                    style={{ background: item.accent }}
                                  />
                                  <span
                                    className="h-3 w-1/2 rounded"
                                    style={{ background: item.text }}
                                  />
                                </span>
                                <span className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] font-medium">
                                    {item.name}
                                  </span>
                                  {active && <Check size={11} />}
                                </span>
                              </button>
                            );
                          },
                        )}
                      </div>
                    </section>

                    <div
                      className="h-px"
                      style={{ background: "var(--accent)", opacity: 0.6 }}
                    />

                    <section>
                      <label className="mb-3 block text-xs font-semibold">
                        04 / Motion style
                      </label>
                      <div className="space-y-2">
                        {animationOptions.map((item) => {
                          const active = animation === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={() => setAnimation(item.id)}
                              className="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition"
                              style={{
                                borderColor: active
                                  ? "var(--accent)"
                                  : "var(--background)",
                                background: active
                                  ? "var(--gradient-secondary)"
                                  : "transparent",
                              }}
                            >
                              <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                style={{ background: "var(--background)" }}
                              >
                                <motion.span
                                  animate={
                                    active && item.id !== "none"
                                      ? item.id === "float"
                                        ? { y: [0, -3, 0] }
                                        : item.id === "fade"
                                          ? { opacity: [0.35, 1, 0.35] }
                                          : { scale: [1, 1.12, 1] }
                                      : {}
                                  }
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                  }}
                                >
                                  <Sparkles size={14} />
                                </motion.span>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-xs font-medium">
                                  {item.label}
                                </span>
                                <span
                                  className="mt-0.5 block text-[10px]"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  {item.description}
                                </span>
                              </span>
                              {active && <Check size={13} />}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <div
                      className="h-px"
                      style={{ background: "var(--accent)", opacity: 0.6 }}
                    />

                    <section>
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <label className="text-xs font-semibold">
                          05 / Your imagery
                        </label>
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {uploadedImages.length}/4 images
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {uploadedImages.map((src, index) => (
                          <div
                            key={src}
                            className="group relative aspect-square overflow-hidden rounded-lg border"
                            style={{ borderColor: "var(--accent)" }}
                          >
                            <img
                              src={src}
                              alt={`Uploaded image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              aria-label={`Remove image ${index + 1}`}
                              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}

                        {uploadedImages.length < 4 && (
                          <label
                            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed transition hover:opacity-70"
                            style={{
                              borderColor: "var(--accent)",
                              background: "var(--background)",
                            }}
                          >
                            <ImagePlus size={17} />
                            <span className="text-[9px]">Add image</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="sr-only"
                            />
                          </label>
                        )}
                      </div>
                      <p
                        className="mt-2 text-[10px] leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Uploaded images appear in the preview. Images keep their
                        aspect ratio and crop cleanly inside their frames.
                      </p>
                    </section>

                    <div
                      className="h-px"
                      style={{ background: "var(--accent)", opacity: 0.6 }}
                    />

                    <section>
                      <label className="mb-3 block text-xs font-semibold">
                        06 / Conversion
                      </label>
                      <button
                        onClick={() => setShowCta(!showCta)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left"
                        style={{
                          borderColor: "var(--accent)",
                          background: showCta
                            ? "var(--gradient-secondary)"
                            : "transparent",
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ background: "var(--background)" }}
                          >
                            <ArrowUpRight size={15} />
                          </span>
                          <span>
                            <span className="block text-xs font-medium">
                              Call-to-action buttons
                            </span>
                            <span
                              className="mt-1 block text-[10px]"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              Hero and contact section
                            </span>
                          </span>
                        </span>
                        <span
                          className="relative h-5 w-9 rounded-full transition-colors"
                          style={{
                            background: showCta
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                          }}
                        >
                          <span
                            className="absolute top-0.5 h-4 w-4 rounded-full transition-all"
                            style={{
                              left: showCta ? "18px" : "2px",
                              background: "var(--background)",
                            }}
                          />
                        </span>
                      </button>
                    </section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="border-t p-4"
              style={{ borderColor: "var(--accent)" }}
            >
              <button
                onClick={() => setGenerated((current) => current + 1)}
                className="group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--gradient-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <WandSparkles
                  size={16}
                  className="transition-transform group-hover:rotate-12"
                />
                Generate layout
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <p
                className="mt-2 text-center text-[10px]"
                style={{ color: "var(--text-secondary)" }}
              >
                Instant preview · No account needed
              </p>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="min-w-0"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--gradient-secondary)",
                  }}
                >
                  <Eye size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Live preview</h2>
                  <p
                    className="mt-1 text-[11px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {currentSite.label} · {theme.name} theme ·{" "}
                    {
                      animationOptions.find((item) => item.id === animation)
                        ?.label
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="hidden items-center gap-1.5 rounded-full border px-3 py-2 text-[10px] sm:inline-flex"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Preview ready
                </span>
                <button
                  onClick={() => setGenerated((current) => current + 1)}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--background)",
                  }}
                >
                  <RotateCcw size={12} />
                  Refresh
                </button>
                <button
                  onClick={exportWebsite}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--background)",
                  }}
                >
                  <Code2 size={12} />
                  Export ZIP
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                id="design-lab-preview"
                key={`${generated}-${siteType}-${themeType}-${animation}-${showCta}`}
                initial={{ opacity: 0, y: 12, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.995 }}
                transition={{ duration: 0.28 }}
              >
                <WebsitePreview
                  siteType={siteType}
                  theme={theme}
                  animation={animation}
                  keywords={keywords}
                  uploadedImages={uploadedImages}
                  showCta={showCta}
                  siteName={siteName}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: <Layers3 size={15} />,
                  title: "Complete layouts",
                  description: "Hero, content, About and Contact sections.",
                },
                {
                  icon: <Sparkles size={15} />,
                  title: "Motion included",
                  description: "Choose how elements enter and move.",
                },
                {
                  icon: <Monitor size={15} />,
                  title: "Responsive preview",
                  description: "Switch between desktop and mobile widths.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="rounded-xl border p-4"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--background)",
                  }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ background: "var(--gradient-secondary)" }}
                    >
                      {item.icon}
                    </span>
                    <h3 className="text-xs font-semibold">{item.title}</h3>
                  </div>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div
              className="mt-4 flex items-start gap-3 rounded-xl border p-4"
              style={{
                borderColor: "var(--accent)",
                background: "var(--gradient-secondary)",
              }}
            >
              <CircleHelp size={16} className="mt-0.5 shrink-0" />
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                This is a visual layout prototype, not a deployed website.
                Navigation links jump to sections inside the preview; CTAs
                demonstrate placement and can be connected to real destinations
                when the design is implemented.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
