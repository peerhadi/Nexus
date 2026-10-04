"use client";

import { Globe2, MapPin } from "lucide-react";

interface LocationStepProps {
  address: string;
  setAddress: (value: string) => void;
}

export default function LocationStep({
  address,
  setAddress,
}: LocationStepProps) {
  return (
    <div className="animate-[fadeIn_500ms_ease-out]">
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)]">
          <MapPin size={20} />
        </div>

        <h2 className="text-[24px] font-semibold tracking-[-0.04em]">
          Where are you based?
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-[var(--text-tertiary)]">
          This helps Nexus personalize things like regional settings and
          timezones.
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
          Address
        </span>

        <textarea
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="City, region, country..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-4 text-[12px] leading-5 outline-none transition-all duration-300 placeholder:text-[var(--text-disabled)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_5px_rgba(168,255,0,0.06)]"
        />

        <p className="mt-2 flex items-center gap-1.5 text-[9px] text-[var(--text-muted)]">
          <Globe2 size={10} />
          You can change this later.
        </p>
      </label>
    </div>
  );
}
