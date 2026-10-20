export type Shape =
  | "Prism"
  | "Crystal"
  | "Torus Knot"
  | "Helix"
  | "Dodecahedron"
  | "Torus";

export type Finish = "Holographic" | "Chrome" | "Glass" | "Neon";

export type Settings = {
  shape: Shape;
  finish: Finish;
  color: string;
  accent: string;
  glow: number;
  metalness: number;
  rotation: boolean;
  particles: boolean;
  orbits: boolean;
  background: string;
};

export type UpdateSetting = <K extends keyof Settings>(
  key: K,
  value: Settings[K],
) => void;
