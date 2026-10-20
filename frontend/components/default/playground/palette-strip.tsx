"use client";

import { Check, Sparkles as SparkleIcon } from "lucide-react";
import { PALETTES } from "@/components/default/playground/data";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function PaletteStrip({
  settings,
  update,
}: {
  settings: Settings;
  update: UpdateSetting;
}) {
  return (
    <div className="border-t border-[var(--pg-line)] px-4 py-4 sm:px-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SparkleIcon size={14} className="text-[var(--accent)]" />
          <span className="text-xs font-semibold">Colour stories</span>
        </div>
        <span className="text-[10px] text-[var(--text-secondary)]">
          SELECT A PALETTE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {PALETTES.map((palette) => {
          const active = settings.color === palette.a;

          return (
            <button
              key={palette.name}
              type="button"
              onClick={() => {
                update("color", palette.a);
                update("accent", palette.b);
              }}
              className={`group min-w-0 border p-2 text-left transition ${
                active
                  ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                  : "border-[var(--pg-line)] hover:border-[var(--accent)]"
              }`}
            >
              <span className="mb-2 flex h-8 overflow-hidden">
                <span
                  className="h-full w-1/2 transition-transform group-hover:scale-110"
                  style={{ background: palette.a }}
                />
                <span
                  className="h-full w-1/2 transition-transform group-hover:scale-110"
                  style={{ background: palette.b }}
                />
              </span>
              <span className="flex items-center justify-between gap-1 text-[10px] font-medium">
                <span className="truncate">{palette.name}</span>
                {active && (
                  <Check
                    size={12}
                    className="shrink-0 text-[var(--accent)]"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
