import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ServicesNav() {
  return (
    <nav className="border-t border-[var(--card-border)] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link
          href="/services/ai-systems"
          className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 transition hover:text-[var(--accent)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition group-hover:-translate-x-1 group-hover:border-[var(--accent)]">
            <ArrowLeft size={17} />
          </span>
          <span>
            <span className="integration-muted block text-[10px] uppercase tracking-[0.15em]">
              Previous service
            </span>
            <span className="mt-1 block text-sm font-semibold">
              AI Systems
            </span>
          </span>
        </Link>

        <Link
          href="/services"
          className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 transition hover:text-[var(--accent)]"
        >
          <span className="text-right">
            <span className="integration-muted block text-[10px] uppercase tracking-[0.15em]">
              Explore
            </span>
            <span className="mt-1 block text-sm font-semibold">
              All services
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition group-hover:translate-x-1 group-hover:border-[var(--accent)]">
            <ArrowRight size={17} />
          </span>
        </Link>
      </div>
    </nav>
  );
}
