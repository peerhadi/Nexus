"use client";

export default function BuildField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  optional = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-neutral-500">
        {icon}
        {label}

        {optional && (
          <span className="normal-case tracking-normal text-neutral-300">
            optional
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-black/[0.08] bg-neutral-50/70 px-4 text-sm font-medium outline-none transition-all placeholder:text-neutral-300 focus:border-black/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
      />
    </div>
  );
}
