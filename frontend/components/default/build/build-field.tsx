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
      <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
        {icon}
        {label}

        {optional && (
          <span className="normal-case tracking-normal text-[var(--text-disabled)]">
            optional
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--input)] px-4 text-sm font-medium outline-none transition-all placeholder:text-[var(--text-disabled)] focus:border-[var(--border-focus)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.06)]"
      />
    </div>
  );
}
