"use client";

import { Check } from "lucide-react";
import RangeControl from "@/components/default/playground/range-control";
import SectionLabel from "@/components/default/playground/section-label";
import { FINISHES } from "@/components/default/playground/data";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function TabSurface({
  settings,
  update,
}: {
  settings: Settings;
  update: UpdateSetting;
}) {
  return (
    <>
      <div>
        <SectionLabel index="01" title="Surface finish" />
        <div className="space-y-2">
          {FINISHES.map((finish, index) => {
            const active = settings.finish === finish;

            return (
              <button
                key={finish}
                type="button"
                onClick={() => update("finish", finish)}
                className={`flex w-full items-center gap-3 border p-3 text-left transition ${
                  active
                    ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                    : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                }`}
              >
                <span
                  className="h-10 w-10 shrink-0"
                  style={{
                    background: [
                      `linear-gradient(135deg, ${settings.color}, ${settings.accent}, #FFFFFF, ${settings.color})`,
                      `linear-gradient(135deg, #FFFFFF, ${settings.color}, #8494AB)`,
                      `linear-gradient(135deg, #FFFFFF88, ${settings.color}66, ${settings.accent}AA)`,
                      `linear-gradient(135deg, ${settings.color}, ${settings.accent})`,
                    ][index],
                    border: "1px solid var(--pg-line)",
                    clipPath:
                      "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                  }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold">{finish}</span>
                  <span className="mt-1 block text-[10px] text-[var(--text-secondary)]">
                    {
                      [
                        "Iridescent spectral reflections",
                        "Polished metallic surfaces",
                        "Transparent crystal finish",
                        "Self-illuminating colour",
                      ][index]
                    }
                  </span>
                </span>
                {active && (
                  <Check size={14} className="shrink-0 text-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-5 border-t border-[var(--pg-line)] pt-5">
        <SectionLabel index="02" title="Material properties" />
        <RangeControl
          label="Metalness"
          value={settings.metalness}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => update("metalness", value)}
        />
        <p className="text-[10px] leading-5 text-[var(--text-secondary)]">
          Metalness is most visible on Chrome and Holographic finishes.
        </p>
      </div>
    </>
  );
}
