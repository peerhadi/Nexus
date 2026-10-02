"use client";

import { Check, Palette } from "lucide-react";

export const themes = [
  {
    id: "neon",
    name: "Neon White",
    description: "Bright, electric, alive.",
    className:
      "bg-white border-black/[0.08] shadow-[0_0_45px_rgba(255,255,255,0.9)]",
    orb: "bg-[conic-gradient(from_90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)]",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Soft color. Infinite depth.",
    className:
      "bg-[#f6fff9] border-emerald-300/50 shadow-[0_0_45px_rgba(52,211,153,0.2)]",
    orb: "bg-[conic-gradient(from_180deg,#00ffa3,#00c6ff,#9b5cff,#ff66c4,#00ffa3)]",
  },
  {
    id: "violet",
    name: "Hyper Violet",
    description: "Bold. Strange. Brilliant.",
    className:
      "bg-[#fbf8ff] border-violet-300/50 shadow-[0_0_45px_rgba(139,92,246,0.22)]",
    orb: "bg-[conic-gradient(from_45deg,#7c3aed,#ec4899,#22d3ee,#7c3aed)]",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Warm energy, all day.",
    className:
      "bg-[#fffdf7] border-orange-300/50 shadow-[0_0_45px_rgba(251,146,60,0.2)]",
    orb: "bg-[conic-gradient(from_90deg,#ff4d00,#ffb000,#fff000,#ff3d81,#ff4d00)]",
  },
];

interface ThemeStepProps {
  theme: string;
  setTheme: (value: string) => void;
}

export default function ThemeStep({ theme, setTheme }: ThemeStepProps) {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
          <Palette size={20} />
        </div>

        <h2 className="text-[24px] font-semibold tracking-[-0.04em]">
          Pick your energy.
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-black/40">
          Choose a starting theme. You&apos;ll be able to customize it later.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((item) => {
          const selected = theme === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              className={[
                "relative overflow-hidden rounded-2xl border p-4 text-left",
                item.className,
                selected ? "border-cyan-400 ring-2 ring-cyan-400/20" : "",
              ].join(" ")}
            >
              <div className={["mb-4 h-24 rounded-xl", item.orb].join(" ")}>
                <div className="flex h-full items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/70 shadow-2xl backdrop-blur-xl" />
                </div>
              </div>

              <p className="text-[11px] font-semibold">{item.name}</p>

              <p className="mt-1 text-[9px] text-black/40">
                {item.description}
              </p>

              {selected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-white">
                  <Check size={12} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
