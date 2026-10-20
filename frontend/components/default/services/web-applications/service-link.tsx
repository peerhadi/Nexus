import Link from "next/link";
import { type ReactNode } from "react";

export default function ServiceLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        secondary
          ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-secondary)]"
          : "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold !text-white transition hover:opacity-90"
      }
    >
      {children}
    </Link>
  );
}
