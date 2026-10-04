"use client";

import { Mail } from "lucide-react";

interface EmailStepProps {
  email: string;
  setEmail: (value: string) => void;
  next: () => void;
}

export default function EmailStep({ email, setEmail, next }: EmailStepProps) {
  return (
    <div className="animate-[fadeIn_500ms_ease-out]">
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_0_30px_rgba(0,229,255,0.15)]">
          <Mail size={20} />
        </div>

        <h2 className="text-[24px] font-semibold tracking-[-0.04em]">
          First, your email.
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-[var(--text-tertiary)]">
          This will become your Nexus account identity.
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
          Email address
        </span>

        <div className="group relative">
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") next();
            }}
            placeholder="you@example.com"
            className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-[13px] outline-none transition-all duration-300 placeholder:text-[var(--text-disabled)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_5px_rgba(0,229,255,0.07),0_10px_30px_rgba(0,0,0,0.04)]"
          />

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00)] transition-all duration-500 group-focus-within:w-[92%]" />
        </div>
      </label>
    </div>
  );
}
