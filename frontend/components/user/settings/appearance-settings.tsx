"use client";

import { useEffect, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";

export const themes = [
  {
    id: "neon",
    name: "Neon White",
    description: "Bright, electric, alive.",
    className:
      "bg-[var(--surface)] border-[var(--border)] shadow-[0_0_45px_rgba(255,255,255,0.2)]",
    orb: "bg-[conic-gradient(from_90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)]",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Soft color. Infinite depth.",
    className:
      "bg-[var(--surface)] border-emerald-300/50 shadow-[0_0_45px_rgba(52,211,153,0.2)]",
    orb: "bg-[conic-gradient(from_180deg,#00ffa3,#00c6ff,#9b5cff,#ff66c4,#00ffa3)]",
  },
  {
    id: "violet",
    name: "Hyper Violet",
    description: "Bold. Strange. Brilliant.",
    className:
      "bg-[var(--surface)] border-violet-300/50 shadow-[0_0_45px_rgba(139,92,246,0.22)]",
    orb: "bg-[conic-gradient(from_45deg,#7c3aed,#ec4899,#22d3ee,#7c3aed)]",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Warm energy, all day.",
    className:
      "bg-[var(--surface)] border-orange-300/50 shadow-[0_0_45px_rgba(251,146,60,0.2)]",
    orb: "bg-[conic-gradient(from_90deg,#ff4d00,#ffb000,#fff000,#ff3d81,#ff4d00)]",
  },
] as const;

type ThemeId = (typeof themes)[number]["id"];
type Mode = "light" | "dark";

function applyAppearance(mode: Mode, theme: ThemeId) {
  const root = document.documentElement;

  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = theme;
}

export default function AppearanceSettings() {
  const [mode, setMode] = useState<Mode>("dark");
  const [theme, setTheme] = useState<ThemeId>("neon");

  useEffect(() => {
    const savedMode = localStorage.getItem("nexus_mode");
    const savedTheme = localStorage.getItem("nexus_theme");

    const nextMode: Mode =
      savedMode === "dark" || savedMode === "light" ? savedMode : "dark";

    const nextTheme: ThemeId = themes.some((item) => item.id === savedTheme)
      ? (savedTheme as ThemeId)
      : "neon";

    setMode(nextMode);
    setTheme(nextTheme);

    applyAppearance(nextMode, nextTheme);
  }, []);

  const changeMode = (value: Mode) => {
    setMode(value);
    localStorage.setItem("nexus_mode", value);

    applyAppearance(value, theme);
  };

  const changeTheme = (value: ThemeId) => {
    setTheme(value);
    localStorage.setItem("nexus_theme", value);

    applyAppearance(mode, value);
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="text-[11px] font-black text-[var(--text-primary)]">
          Interface mode
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => changeMode("light")}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
              mode === "light"
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-[var(--surface-muted)]"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mode === "light"
                  ? "bg-[var(--accent-soft-strong)] text-[var(--accent)]"
                  : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
              }`}
            >
              <Sun size={17} />
            </div>

            <div className="flex-1">
              <div className="text-[11px] font-black text-[var(--text-primary)]">
                Light
              </div>

              <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                Bright and clean
              </div>
            </div>

            {mode === "light" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Check size={11} />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => changeMode("dark")}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
              mode === "dark"
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-[var(--surface-muted)]"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mode === "dark"
                  ? "bg-[var(--accent-soft-strong)] text-[var(--accent)]"
                  : "bg-[var(--surface-hover)] text-[var(--text-muted)]"
              }`}
            >
              <Moon size={17} />
            </div>

            <div className="flex-1">
              <div className="text-[11px] font-black text-[var(--text-primary)]">
                Dark
              </div>

              <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                Dark and immersive
              </div>
            </div>

            {mode === "dark" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Check size={11} />
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-5 flex items-center gap-2">
          <Palette size={13} className="text-[var(--accent)]" />

          <div className="text-[11px] font-black text-[var(--text-primary)]">
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
                  "relative overflow-hidden rounded-2xl border p-4 text-left transition-all",
                  item.className,
                  selected
                    ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20"
                    : "",
                ].join(" ")}
              >
                <div className={["mb-4 h-24 rounded-xl", item.orb].join(" ")}>
                  <div className="flex h-full items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-[var(--surface)] shadow-2xl backdrop-blur-xl" />
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-[var(--text-primary)]">
                  {item.name}
                </p>

                <p className="mt-1 text-[9px] text-[var(--text-muted)]">
                  {item.description}
                </p>

                {selected && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white">
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
