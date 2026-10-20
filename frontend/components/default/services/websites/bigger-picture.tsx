import { ArrowUpRight, LayoutGrid, ShieldCheck, Smartphone } from "lucide-react";
import SectionHeading from "./section-heading";

export default function BiggerPicture() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="THE BIGGER PICTURE"
            title="Your website is part of how people experience your business."
            description="It may be the first place someone encounters your work, compares your offer, checks your credibility, or decides whether to contact you."
          />
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            That makes structure, content, visual design, usability, and
            functionality important together. A polished interface is only
            useful when it helps visitors understand what matters and move
            through the experience without unnecessary friction.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              <LayoutGrid size={20} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
              Clear positioning
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Explain what you offer, who it is for, and why visitors should
              care without making them search for the essentials.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              <Smartphone size={20} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
              Consistent access
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Make important information and actions easy to use across screen
              sizes and input methods.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              <ShieldCheck size={20} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
              Trust and clarity
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Use coherent content, predictable interactions, and appropriate
              safeguards to support confidence.
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] text-[var(--accent)]">
              <ArrowUpRight size={20} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--text-primary)]">
              Meaningful next steps
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Guide visitors toward the right action, whether that means
              making an enquiry, exploring work, or learning more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
