import { ArrowUpRight, Code2, LayoutGrid, Smartphone } from "lucide-react";
import SectionHeading from "./section-heading";

export default function SuccessMetrics() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-28">
        <div>
          <SectionHeading
            eyebrow="WHAT SUCCESS LOOKS LIKE"
            title="Build around outcomes, not just appearances."
            description="The right measures depend on your goals. A useful review considers how the website works for visitors as well as how it looks."
          />
          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            A website's impact depends on its audience, content, offer, and
            implementation. We avoid assuming that a visual change alone
            guarantees better results.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Visitor clarity",
              description:
                "Can people understand the offer and find important information?",
              icon: LayoutGrid,
            },
            {
              title: "Usability",
              description:
                "Can visitors navigate, read, and interact comfortably?",
              icon: Smartphone,
            },
            {
              title: "Useful actions",
              description:
                "Are the intended next steps visible and straightforward?",
              icon: ArrowUpRight,
            },
            {
              title: "Maintainability",
              description:
                "Can the website be understood, updated, and extended sensibly?",
              icon: Code2,
            },
          ].map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.title}
                className="rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6"
              >
                <Icon size={21} className="text-[var(--accent)]" />
                <h3 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
                  {metric.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
