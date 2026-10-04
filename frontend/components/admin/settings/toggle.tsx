export default function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle setting"
      className={[
        "relative h-6 w-11 shrink-0 rounded-full transition-all duration-300",
        enabled ? "bg-[var(--accent)]" : "bg-[var(--surface-hover)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-4 w-4 rounded-full bg-[var(--surface)] shadow-sm transition-all duration-300",
          enabled ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}
