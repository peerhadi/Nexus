"use client";

import { Sparkles } from "lucide-react";

export default function LoginHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)] shadow-sm backdrop-blur-xl">
        <Sparkles size={10} />
        Welcome back
      </div>

      <h1 className="text-[42px] font-semibold leading-[1.05] tracking-[-0.06em]">
        Good to see you.
      </h1>

      <p className="mx-auto mt-3 max-w-[360px] text-[11px] leading-5 text-[var(--text-tertiary)]">
        Sign in and get straight back to building something awesome.
      </p>
    </div>
  );
}
