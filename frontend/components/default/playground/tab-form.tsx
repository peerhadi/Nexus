"use client";

import { Check } from "lucide-react";
import ColourControl from "@/components/default/playground/colour-control";
import SectionLabel from "@/components/default/playground/section-label";
import { SHAPES } from "@/components/default/playground/data";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function TabForm({
  settings,
  update,
}: {
  settings: Settings;
  update: UpdateSetting;
}) {
  return (
    <>
      <div>
        <SectionLabel
          index="01"
          title="Choose your geometry"
          detail="6 FORMS"
        />
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((shape, index) => {
            const active = settings.shape === shape;

            return (
              <button
                key={shape}
                type="button"
                onClick={() => update("shape", shape)}
                className={`group relative overflow-hidden border p-3 text-left transition ${
                  active
                    ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                    : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                }`}
              >
                <span
                  className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 opacity-25 blur-2xl transition group-hover:opacity-70"
                  style={{
                    background: index % 2 ? settings.accent : settings.color,
                  }}
                />
                <span className="relative mb-3 flex h-9 items-center justify-between">
                  <span
                    className="block h-7 w-7 border"
                    style={{
                      borderColor: active ? settings.color : "var(--pg-line)",
                      background: active ? `cyan` : "white",
                      transform: `rotate(${index * 13}deg)`,
                      clipPath: [
                        "polygon(50% 0,100% 50%,50% 100%,0 50%)",
                        "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                        "polygon(50% 0,100% 30%,80% 100%,20% 100%,0 30%)",
                        "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                        "polygon(50% 0,100% 35%,80% 100%,20% 100%,0 35%)",
                        "polygon(0 20%,80% 0,100% 80%,20% 100%)",
                      ][index],
                    }}
                  />
                  {active && (
                    <Check size={14} className="text-[var(--accent)]" />
                  )}
                </span>
                <span className="relative block text-[11px] font-semibold">
                  {shape}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[var(--pg-line)] pt-5">
        <SectionLabel index="02" title="Object colours" />
        <div className="space-y-4">
          <ColourControl
            label="Primary"
            value={settings.color}
            onChange={(value) => update("color", value)}
          />
          <ColourControl
            label="Accent"
            value={settings.accent}
            onChange={(value) => update("accent", value)}
          />
        </div>
      </div>
    </>
  );
}
