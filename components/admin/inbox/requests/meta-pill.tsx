type MetaPillProps = {
  label: string;
  value: string;
};

export function MetaPill({ label, value }: MetaPillProps) {
  return (
    <div className="min-w-0 rounded-xl border border-black/[0.07] bg-white px-3 py-2.5">
      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-black/25">
        {label}
      </div>

      <div className="mt-0.5 truncate text-[9px] font-bold text-black/55">
        {value}
      </div>
    </div>
  );
}
