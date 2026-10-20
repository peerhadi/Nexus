import { Check, Sparkles } from "lucide-react";
import FloatingScene from "./floating-scene";
import SectionHeading from "./section-heading";

export default function ThoughtfulDesign() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-20">
        <div>
          <SectionHeading
            eyebrow="THOUGHTFUL BY DESIGN"
            title="A website should feel considered from every angle."
            description="Visual identity, content hierarchy, and interaction patterns should work together. Each decision should have a reason to exist."
          />
          <div className="mt-7 space-y-4">
            {[
              "Navigation that makes sense",
              "Layouts that adapt to different screens",
              "Motion that supports the experience",
              "Content organised around visitor needs",
              "Functionality that solves a real problem",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--selection)] text-[var(--accent)]">
                  <Check size={12} />
                </span>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
