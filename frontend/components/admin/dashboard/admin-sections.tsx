"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { sections } from "./dashboard-data";

export default function AdminSections() {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">
          All admin sections
        </h2>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Everything in your workspace, one click away
        </p>
      </div>

      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link
              key={section.title}
              href={section.href}
              className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-[var(--surface-hover)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {section.title}
                </p>
                <p className="mt-1 text-xs leading-4 text-[var(--text-muted)]">
                  {section.description}
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
