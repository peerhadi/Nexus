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
    <section className="rounded-2xl border border-black/[0.07] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.025)]">
      <div className="border-b border-black/[0.06] px-6 py-5">
        <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
          {title}
        </h2>

        <p className="mt-1 text-[11px] leading-4 text-black/40">
          {description}
        </p>
      </div>

      <div className="px-6">{children}</div>
    </section>
  );
}
