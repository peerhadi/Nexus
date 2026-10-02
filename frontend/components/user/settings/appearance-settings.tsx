"use client";

import { useEffect, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";

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

export default function AppearanceSettings() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [theme, setTheme] = useState("neon");

  useEffect(() => {
    const savedMode = localStorage.getItem("nexus_mode");
    const savedTheme = localStorage.getItem("nexus_theme");

    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    }

    if (savedTheme && themes.some((item) => item.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const changeMode = (value: "light" | "dark") => {
    setMode(value);
    localStorage.setItem("nexus_mode", value);

    document.documentElement.classList.toggle("dark", value === "dark");
  };

  const changeTheme = (value: string) => {
    setTheme(value);
    localStorage.setItem("nexus_theme", value);
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="text-[11px] font-black text-slate-700">
          Interface mode
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => changeMode("light")}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
              mode === "light"
                ? "border-cyan-400 bg-cyan-50/70"
                : "border-black/[0.05] bg-black/[0.015]"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mode === "light"
                  ? "bg-cyan-100 text-cyan-500"
                  : "bg-black/[0.035] text-slate-400"
              }`}
            >
              <Sun size={17} />
            </div>

            <div className="flex-1">
              <div className="text-[11px] font-black text-slate-700">Light</div>
              <div className="mt-1 text-[9px] font-medium text-slate-400">
                Bright and clean
              </div>
            </div>

            {mode === "light" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-white">
                <Check size={11} />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => changeMode("dark")}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
              mode === "dark"
                ? "border-cyan-400 bg-cyan-50/70"
                : "border-black/[0.05] bg-black/[0.015]"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mode === "dark"
                  ? "bg-cyan-100 text-cyan-500"
                  : "bg-black/[0.035] text-slate-400"
              }`}
            >
              <Moon size={17} />
            </div>

            <div className="flex-1">
              <div className="text-[11px] font-black text-slate-700">Dark</div>
              <div className="mt-1 text-[9px] font-medium text-slate-400">
                Dark and immersive
              </div>
            </div>

            {mode === "dark" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-white">
                <Check size={11} />
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-5 flex items-center gap-2">
          <Palette size={13} className="text-cyan-400" />
          <div className="text-[11px] font-black text-slate-700">
            Nexus themes
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {themes.map((item) => {
            const selected = theme === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changeTheme(item.id)}
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
    </div>
  );
}
