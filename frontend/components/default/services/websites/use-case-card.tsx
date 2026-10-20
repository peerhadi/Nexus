import { Check } from "lucide-react";
import { useCases } from "./data";
import FloatingScene from "./floating-scene";
import UseCaseVisual from "./use-case-visual";

export default function UseCaseCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[number];
  index: number;
}) {
  return (
      <article
        key={useCase.category}
        className="grid overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card)] lg:grid-cols-2"
      >
        <div
          className={`p-6 sm:p-9 lg:p-11 ${
            index % 2 === 1 ? "lg:order-2" : ""
          }`}
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--accent)]">
            {useCase.category}
          </p>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
            {useCase.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {useCase.description}
          </p>

          <ul className="mt-6 space-y-3">
            {useCase.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
              >
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`relative flex min-h-[330px] items-center overflow-hidden border-t border-[var(--card-border)] bg-[var(--surface-secondary)] p-5 sm:p-8 lg:border-t-0 ${
            index % 2 === 1 ? "lg:order-1 lg:border-r" : "lg:border-l"
          }`}
        >
          <FloatingScene
            variant="compact"
            className="absolute inset-0"
          />
          <div className="relative z-10 w-full">
            <UseCaseVisual type={useCase.visual} />
          </div>
        </div>
      </article>
  );
}
