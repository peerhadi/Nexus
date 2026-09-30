import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { colorStyles } from "./data";

type PolicySectionProps = {
  id?: string;
  icon: LucideIcon;
  title: string;
  color: keyof typeof colorStyles;
  text?: string;
  content?: ReactNode;
};

export function PolicySection({
  id,
  icon: Icon,
  title,
  color,
  text,
  content,
}: PolicySectionProps) {
  const styles = colorStyles[color];

  return (
    <section
      id={id}
      className={`rounded-[28px] border ${styles.border} bg-white/85 p-7 shadow-[0_12px_45px_rgba(15,23,42,0.045)] backdrop-blur sm:p-9`}
    >
      <div className="flex gap-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          <Icon size={21} />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h2>

          <div className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-500">
            {text}
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}
