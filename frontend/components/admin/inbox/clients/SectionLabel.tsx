import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
      {children}
    </div>
  );
}
