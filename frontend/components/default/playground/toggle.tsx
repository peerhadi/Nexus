"use client";

export default function Toggle({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      className="flex w-full items-center justify-between py-2 text-left"
    >
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          enabled ? "bg-[var(--accent)]" : "bg-black/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
