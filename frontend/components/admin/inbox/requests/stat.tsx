type StatProps = {
  label: string;
  value: number;
};

export function Stat({ label, value }: StatProps) {
  return (
    <div className="flex h-[58px] items-center justify-between border-r border-black/[0.07] px-5 last:border-r-0 sm:px-8">
      <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-black/30">
        {label}
      </span>

      <span className="text-[16px] font-bold tracking-[-0.03em]">{value}</span>
    </div>
  );
}
