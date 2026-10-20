"use client";

import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";

import SectionHeading from "./section-heading";
import SettingRow from "./setting-row";
import { themes } from "./settings-data";

type AppearancePanelProps = {
  theme: string;
  appearance: string;
  onApplyAppearance: (theme: string, appearance: string) => void;
};

export default function AppearancePanel({
  theme,
  appearance,
  onApplyAppearance,
}: AppearancePanelProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <SectionHeading
        eyebrow="Personalization"
        title="Appearance"
        description="Customize how the Nexus admin workspace looks on this device."
      />

      <SettingRow
        icon={Palette}
        title="Accent theme"
        description="Choose the accent color used by interface elements."
      >
        <div className="flex flex-wrap gap-2">
          {themes.map((option) => {
            const active = theme === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-label={option.name}
                aria-pressed={active}
                title={option.name}
                onClick={() => onApplyAppearance(option.id, appearance)}
                className={`flex h-9 items-center gap-2 rounded-lg border px-2.5 transition ${
                  active
                    ? "border-[var(--border-strong)] bg-[var(--surface-secondary)]"
                    : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: option.accent }}
                />
                <span className="text-[10px] font-medium text-[var(--text-primary)]">
                  {option.name}
                </span>
                {active && (
                  <Check size={12} className="text-[var(--text-secondary)]" />
                )}
              </button>
            );
          })}
        </div>
      </SettingRow>

      <SettingRow
        icon={Sun}
        title="Interface mode"
        description="Switch between the light and dark interface."
      >
        <div className="flex rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-1">
          <button
            type="button"
            aria-pressed={appearance === "light"}
            onClick={() => onApplyAppearance(theme, "light")}
            className={`flex h-8 items-center gap-2 rounded-md px-3 text-[11px] font-medium transition ${
              appearance === "light"
                ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Sun size={13} />
            Light
          </button>

          <button
            type="button"
            aria-pressed={appearance === "dark"}
            onClick={() => onApplyAppearance(theme, "dark")}
            className={`flex h-8 items-center gap-2 rounded-md px-3 text-[11px] font-medium transition ${
              appearance === "dark"
                ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Moon size={13} />
            Dark
          </button>
        </div>
      </SettingRow>

      <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Monitor size={13} className="text-[var(--text-muted)]" />
          <p className="text-[10px] leading-5 text-[var(--text-muted)]">
            These preferences are stored in this browser. They are not
            synchronized across devices.
          </p>
        </div>
      </div>
    </section>
  );
}
