"use client";

export function IconButton({
  label,
  onClick,
  children,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
