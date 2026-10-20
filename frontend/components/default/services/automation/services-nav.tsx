import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function ServicesNav() {
  return (
    <nav
      aria-label="Explore other services"
      className="border-t border-[var(--card-border)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <Link
          href="/services/web-applications"
          className="group flex items-center gap-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          <ArrowDownRight
            size={17}
            className="rotate-[135deg] transition-transform group-hover:-translate-x-1"
          />
          <span>
            <span className="block text-xs">Previous service</span>
            <span className="mt-1 block font-semibold text-[var(--text-primary)]">
              Web Applications
            </span>
          </span>
        </Link>

        <Link
          href="/services/ai-systems"
          className="group flex items-center gap-3 self-start text-left sm:self-auto sm:text-right"
        >
          <span>
            <span className="block text-xs text-[var(--text-secondary)]">
              Next service
            </span>
            <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
              AI Systems
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card)] transition group-hover:border-[var(--accent)]">
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </nav>
  );
}
