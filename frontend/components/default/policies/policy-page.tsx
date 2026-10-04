import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PolicySection } from "./policy-section";

export type PolicyColor =
  | "violet"
  | "cyan"
  | "emerald"
  | "pink"
  | "orange"
  | "blue"
  | "fuchsia"
  | "yellow";

export type PolicySectionData = {
  id?: string;
  icon: LucideIcon;
  title: string;
  color: PolicyColor;
  text?: string;
  content?: React.ReactNode;
};

type PolicyPageProps = {
  badge: string;
  badgeIcon: LucideIcon;
  title: React.ReactNode;
  description: string;
  sections: PolicySectionData[];
  summary?: {
    icon: LucideIcon;
    title: string;
    text: string;
  };
};

export function PolicyPage({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  sections,
  summary,
}: PolicyPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-secondary)]">
      <div className="pointer-events-none fixed -left-32 top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-1/3 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-180px] left-1/3 h-96 w-96 rounded-full bg-pink-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <Link
          href="/home"
          className="mb-12 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[var(--surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--text-tertiary)] transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
        >
          <ArrowLeft size={13} />
          Back to Nexus
        </Link>

        <header className="mb-14 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-violet-600">
            <BadgeIcon size={14} />
            {badge}
          </div>

          <h1 className="text-5xl font-black tracking-[-0.055em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[var(--text-tertiary)] sm:text-base">
            {description}
          </p>

          <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-[var(--surface)] px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Last updated: September 2026
          </div>
        </header>

        {summary && (
          <section className="mb-6 overflow-hidden rounded-[30px] bg-[var(--gradient-primary)] p-8 text-white shadow-[0_20px_70px_rgba(139,92,246,0.18)] sm:p-10">
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface)]/20">
                <summary.icon size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  {summary.title}
                </h2>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-white/85">
                  {summary.text}
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="space-y-5">
          {sections.map((section) => (
            <PolicySection
              key={section.title}
              id={section.id}
              icon={section.icon}
              title={section.title}
              color={section.color}
              text={section.text}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
