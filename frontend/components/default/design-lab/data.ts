import type {
  AnimationOption,
  SiteTypeOption,
  Theme,
  ThemeType,
} from "@/components/default/design-lab/types";

export const themes: Record<ThemeType, Theme> = {
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

export const siteTypes: SiteTypeOption[] = [
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

export const animationOptions: AnimationOption[] = [
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

export const stockImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85",
];

export const projectImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
];

export const restaurantImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=85",
];
