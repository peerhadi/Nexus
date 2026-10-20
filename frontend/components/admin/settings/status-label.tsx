import type { ConnectionState } from "./settings-types";

export default function StatusLabel({ state }: { state: ConnectionState }) {
  const connected = state === "connected";
  const checking = state === "checking";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium ${
        connected
          ? "border-[var(--success)]/20 bg-[var(--success-soft)] text-[var(--success)]"
          : checking
            ? "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]"
            : "border-[var(--danger)]/20 bg-[var(--danger-soft)] text-[var(--danger)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          connected
            ? "bg-[var(--success)]"
            : checking
              ? "animate-pulse bg-[var(--text-muted)]"
              : "bg-[var(--danger)]"
        }`}
      />
      {checking ? "Checking" : connected ? "Connected" : "Unavailable"}
    </span>
  );
}
