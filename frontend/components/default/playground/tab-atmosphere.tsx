"use client";

import { Check } from "lucide-react";
import RangeControl from "@/components/default/playground/range-control";
import SectionLabel from "@/components/default/playground/section-label";
import Toggle from "@/components/default/playground/toggle";
import { BACKGROUNDS } from "@/components/default/playground/data";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function TabAtmosphere({
  settings,
  update,
}: {
  settings: Settings;
  update: UpdateSetting;
}) {
  return (
    <>
      <div>
        <SectionLabel index="01" title="Light and glow" />
        <RangeControl
          label="Bloom intensity"
          value={settings.glow}
          min={0}
          max={2}
          step={0.05}
          onChange={(value) => update("glow", value)}
        />
        <div className="mt-4 flex items-center gap-2">
          {[0.25, 0.65, 1.15, 1.65].map((glow) => (
            <button
              key={glow}
              type="button"
              onClick={() => update("glow", glow)}
              className={`flex-1 border py-2 text-[10px] transition ${
                Math.abs(settings.glow - glow) < 0.02
                  ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                  : "border-[var(--pg-line)] hover:border-[var(--accent)]"
              }`}
            >
              {glow < 0.5
                ? "Soft"
                : glow < 1
                  ? "Medium"
                  : glow < 1.5
                    ? "Bright"
                    : "Intense"}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--pg-line)] pt-5">
        <SectionLabel index="02" title="Environment" />
        <p className="mb-3 text-[10px] text-[var(--text-secondary)]">
          Choose the canvas behind your sculpture.
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {BACKGROUNDS.map((background) => (
            <button
              key={background}
              type="button"
              aria-label={`Background ${background}`}
              onClick={() => update("background", background)}
              className="flex aspect-square items-center justify-center border transition hover:scale-105"
              style={{
                backgroundColor: background,
                borderColor:
                  settings.background === background
                    ? "var(--accent)"
                    : "var(--pg-line)",
                outline:
                  settings.background === background
                    ? "1px solid var(--accent)"
                    : "none",
                outlineOffset: 2,
              }}
            >
              {settings.background === background && (
                <Check
                  size={12}
                  color={
                    background === "#171A25" ? "#FFFFFF" : "#252A36"
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--pg-line)] pt-4">
        <SectionLabel index="03" title="Scene effects" />
        <Toggle
          label="Object rotation"
          enabled={settings.rotation}
          onChange={(value) => update("rotation", value)}
        />
        <Toggle
          label="Orbital structures"
          enabled={settings.orbits}
          onChange={(value) => update("orbits", value)}
        />
        <Toggle
          label="Particle field"
          enabled={settings.particles}
          onChange={(value) => update("particles", value)}
        />
      </div>
    </>
  );
}
