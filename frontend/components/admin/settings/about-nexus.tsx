"use client";

import { ArrowUpRight, CircleHelp } from "lucide-react";

export default function AboutNexus() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
      <div className="flex items-center gap-2">
        <CircleHelp size={15} className="text-[var(--text-secondary)]" />
        <h2 className="text-xs font-semibold text-[var(--text-primary)]">
          About Nexus
        </h2>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-[var(--text-secondary)]">
        Nexus is your workspace for managing clients, projects, requests,
        conversations, and delivery progress.
      </p>

      <a
        href="/"
        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
      >
        Visit website
        <ArrowUpRight size={13} />
      </a>
    </section>
  );
}
