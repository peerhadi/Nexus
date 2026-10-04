import type { ReactNode } from "react";

export default function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_30px_rgba(0,0,0,0.025)]">
      <div className="border-b border-[var(--border-subtle)] px-6 py-5">
        <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
          {title}
        </h2>

        <p className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
          {description}
        </p>
      </div>

      <div className="px-6">{children}</div>
    </section>
  );
}
