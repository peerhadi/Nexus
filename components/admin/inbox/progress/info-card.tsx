import type { ReactNode } from "react";

type InfoCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
};

export default function InfoCard({ label, value, icon }: InfoCardProps) {
  return (
    <div className="group rounded-xl border border-black/[0.07] bg-white px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-1.5 text-black/25">
        {icon}

        <span className="text-[7px] font-bold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <div className="mt-1.5 truncate text-[9px] font-bold text-black/60">
        {value}
      </div>
    </div>
  );
}
