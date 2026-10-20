import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  LayoutGrid,
  Palette,
  Search,
} from "lucide-react";

export default function UseCaseVisual({ type }: { type: string }) {
  const visuals: Record<string, { label: string; icon: typeof LayoutGrid }[]> =
    {
      business: [
        { label: "What we do", icon: LayoutGrid },
        { label: "Services and details", icon: Layers3 },
        { label: "Get in touch", icon: ArrowUpRight },
      ],
      portfolio: [
        { label: "Featured work", icon: Palette },
        { label: "Project details", icon: Code2 },
        { label: "Contact the creator", icon: ArrowUpRight },
      ],
      product: [
        { label: "Explore the offer", icon: Search },
        { label: "Understand the details", icon: Check },
        { label: "Take the next step", icon: ArrowRight },
      ],
    };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--text-primary)]">
          Page structure example
        </span>
        <span className="rounded-full border border-[var(--card-border)] bg-[var(--card)] px-2.5 py-1 text-[10px] text-[var(--text-secondary)]">
          Illustrative
        </span>
      </div>

      <div className="space-y-3">
        {visuals[type].map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.label}>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--selection)] text-[var(--accent)]">
                  <Icon size={17} />
                </div>
                <span className="flex-1 text-xs font-medium text-[var(--text-primary)] sm:text-sm">
                  {item.label}
                </span>
                <Check size={15} className="text-[var(--success)]" />
              </div>
              {index < visuals[type].length - 1 && (
                <div className="flex h-5 items-center pl-7">
                  <div className="h-full border-l border-dashed border-[var(--card-border)]" />
                  <ArrowDown
                    size={12}
                    className="-ml-[6px] text-[var(--text-secondary)]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
