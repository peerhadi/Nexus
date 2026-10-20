export type SiteType = "ecommerce" | "portfolio" | "saas" | "restaurant";
export type AnimationType = "rise" | "fade" | "stagger" | "float" | "none";
export type ThemeType = "prism" | "midnight" | "earth" | "rose" | "mono" | "ocean";

export type Theme = {
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

export type SiteTypeOption = {
  id: SiteType;
  label: string;
  description: string;
};

export type AnimationOption = {
  id: AnimationType;
  label: string;
  description: string;
};

export type NavigateTo = (href: string) => void;
