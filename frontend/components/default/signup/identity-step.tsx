"use client";

import { CircleUserRound, Eye, EyeOff, LockKeyhole } from "lucide-react";

interface IdentityStepProps {
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

export default function IdentityStep({
  name,
  setName,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: IdentityStepProps) {
  return (
    <div className="animate-[fadeIn_500ms_ease-out]">
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)]">
          <CircleUserRound size={20} />
        </div>

        <h2 className="text-[24px] font-semibold tracking-[-0.04em]">
          Who are you?
        </h2>

        <p className="mt-2 text-[11px] leading-5 text-[var(--text-tertiary)]">
          Give your Nexus account a name and protect it with a password.
        </p>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
            Your name
          </span>

          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-[12px] outline-none transition-all duration-300 placeholder:text-[var(--text-disabled)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_5px_rgba(255,0,204,0.05)]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
            Password
          </span>

          <div className="relative">
            <LockKeyhole
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] pl-11 pr-12 text-[12px] outline-none transition-all duration-300 placeholder:text-[var(--text-disabled)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
