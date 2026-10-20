"use client";

import { useEffect, useState } from "react";

export default function ColourControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDraft(value), [value]);

  function updateDraft(next: string) {
    setDraft(next);
    if (/^#[0-9a-fA-F]{6}$/.test(next)) {
      onChange(next.toUpperCase());
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <input
        type="color"
        aria-label={label}
        value={value}
        onChange={(event) => {
          setDraft(event.target.value.toUpperCase());
          onChange(event.target.value.toUpperCase());
        }}
        className="playground-color h-10 w-12 shrink-0 cursor-pointer"
      />
      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          {label}
        </label>
        <input
          value={draft}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => updateDraft(event.target.value)}
          className="w-full bg-transparent font-mono text-sm uppercase text-[var(--text-primary)] outline-none"
        />
      </div>
    </div>
  );
}
