"use client";

import { Check, SlidersHorizontal, Sparkles } from "lucide-react";

import Card from "./card";
import SettingRow from "./setting-row";
import Toggle from "./toggle";

export default function AppearanceSettings({
  animations,
  setAnimations,
  compactMode,
  setCompactMode,
}: {
  animations: boolean;
  setAnimations: (value: boolean) => void;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <Card
        title="Interface theme"
        description="Choose how the Nexus administration interface should look."
      >
        <div className="grid grid-cols-2 gap-4 py-6">
          <button
            type="button"
            className="rounded-2xl border border-[#06b6d44d] bg-[#06b6d414] p-4 text-left shadow-[0_5px_15px_rgba(0,0,0,0.04)]"
          >
            <div className="h-[105px] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-3">
              <div className="flex gap-2">
                <div className="h-[75px] w-10 rounded-md bg-[var(--surface-hover)]" />

                <div className="flex-1 space-y-2">
                  <div className="h-2 w-20 rounded bg-[var(--border)]" />
                  <div className="h-8 rounded-md bg-[var(--surface-hover)]" />
                  <div className="h-2 w-28 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold">Light</p>

                <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">
                  Clean and bright
                </p>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-contrast)]">
                <Check size={12} />
              </div>
            </div>
          </button>

          <button
            type="button"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 text-left opacity-55 transition hover:opacity-80"
          >
            <div className="h-[105px] overflow-hidden rounded-xl bg-[#151515] p-3">
              <div className="flex gap-2">
                <div className="h-[75px] w-10 rounded-md bg-[var(--surface-hover)]" />

                <div className="flex-1 space-y-2">
                  <div className="h-2 w-20 rounded bg-[var(--surface)]/20" />
                  <div className="h-8 rounded-md bg-[var(--surface-hover)]" />
                  <div className="h-2 w-28 rounded bg-[var(--surface)]/15" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold">Dark</p>

              <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">Coming soon</p>
            </div>
          </button>
        </div>
      </Card>

      <Card
        title="Motion"
        description="Control animation behavior across the admin interface."
      >
        <SettingRow
          icon={Sparkles}
          title="Interface animations"
          description="Keep transitions and micro-interactions enabled."
        >
          <Toggle
            enabled={animations}
            onClick={() => setAnimations(!animations)}
          />
        </SettingRow>

        <SettingRow
          icon={SlidersHorizontal}
          title="Compact interface"
          description="Use tighter spacing for information-dense screens."
        >
          <Toggle
            enabled={compactMode}
            onClick={() => setCompactMode(!compactMode)}
          />
        </SettingRow>
      </Card>
    </div>
  );
}
