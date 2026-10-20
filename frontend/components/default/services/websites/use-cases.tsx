import { useCases } from "./data";
import SectionHeading from "./section-heading";
import UseCaseCard from "./use-case-card";

export default function UseCases() {
  return (
    <section className="border-y border-[var(--card-border)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionHeading
          eyebrow="WHERE IT MAKES A DIFFERENCE"
          title="Start with the experience your visitors need."
          description="These examples illustrate how a website can be structured around different goals. The final pages and features depend on your project requirements."
        />

        <div className="mt-12 space-y-5">
            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={useCase.category}
                useCase={useCase}
                index={index}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
