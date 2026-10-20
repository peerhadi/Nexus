import type {
  Finish,
  Settings,
  Shape,
} from "@/components/default/playground/types";

export const INITIAL: Settings = {
  shape: "Prism",
  finish: "Holographic",
  color: "#70E7FF",
  accent: "#9A7BFF",
  glow: 1.15,
  metalness: 0.85,
  rotation: true,
  particles: true,
  orbits: true,
  background: "#F7F9FC",
};

export const SHAPES: Shape[] = [
  "Prism",
  "Crystal",
  "Torus Knot",
  "Helix",
  "Dodecahedron",
  "Torus",
];

export const FINISHES: Finish[] = ["Holographic", "Chrome", "Glass", "Neon"];

export const PALETTES = [
  { name: "Arctic", a: "#70E7FF", b: "#9A7BFF" },
  { name: "Ultraviolet", a: "#B38AFF", b: "#FF79C8" },
  { name: "Solar flare", a: "#FFBB70", b: "#FF6584" },
  { name: "Electric", a: "#65F2C1", b: "#56A7FF" },
  { name: "Cyber", a: "#E1FF70", b: "#70E7FF" },
  { name: "Rose gold", a: "#FFA7AE", b: "#D7B2FF" },
];

export const BACKGROUNDS = [
  "#F7F9FC",
  "#EDF5FF",
  "#F3EEFF",
  "#FFF1EC",
  "#EAF8F2",
  "#FFFFFF",
  "#171A25",
];
