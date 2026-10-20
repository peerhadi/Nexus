"use client";

import { ChevronRight, CircleHelp } from "lucide-react";

import { workspaceShortcuts } from "./settings-data";

export default function WorkspaceShortcuts() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-2">
        <CircleHelp size={15} className="text-[var(--text-secondary)]" />
        <h2 className="text-xs font-semibold text-[var(--text-primary)]">
          Workspace shortcuts
        </h2>
      </div>

      <div className="mt-3">
        {workspaceShortcuts.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between border-t border-[var(--border-subtle)] py-3 first:border-t-0"
          >
            <span className="text-[11px] font-medium text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
              {item.label}
            </span>
            <ChevronRight
              size={13}
              className="text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
