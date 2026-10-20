import { process } from "./data";
import FloatingScene from "./floating-scene";
import SectionHeading from "./section-heading";

export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="A clear path from the first idea to launch."
            description="A structured process keeps goals, content, functionality, and delivery expectations aligned throughout the project."
          />

          <div className="relative mt-8 min-h-[230px] overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--surface-secondary)]">
            <FloatingScene variant="compact" className="absolute inset-0" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                One step at a time
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  "Discover",
                  "Structure",
                  "Design",
                  "Build",
                  "Test",
                  "Launch",
                ].map((stage, index) => (
                  <div
                    key={stage}
                    className="flex items-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--surface-secondary)] px-2.5 py-2"
                  >
                    <span className="text-[10px] text-[var(--accent)]">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-6 text-[var(--text-secondary)]">
                Each stage builds on the decisions made before it, from
                understanding the requirements to preparing the final handoff.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {process.map((step) => (
            <article
              key={step.number}
              className="grid grid-cols-[46px_1fr] gap-4 border-b border-[var(--card-border)] py-6 first:pt-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] text-xs font-semibold text-[var(--accent)]">
                {step.number}
              </div>
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                  {step.detail}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
