"use client";

import { Sparkles } from "lucide-react";
import { themes } from "./theme-step";

interface FinishStepProps {
  email: string;
  name: string;
  theme: string;
}

export default function FinishStep({ email, name, theme }: FinishStepProps) {
  return (
    <div className="py-8 text-center animate-[fadeIn_600ms_ease-out]">
      <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00,#ff00cc)] opacity-30 blur-xl animate-[spin_4s_linear_infinite]" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-black text-white shadow-[0_0_50px_rgba(0,229,255,0.2)]">
          <Sparkles size={28} />
        </div>
      </div>

      <h2 className="text-[30px] font-semibold tracking-[-0.05em]">
        You&apos;re ready.
      </h2>

      <p className="mx-auto mt-3 max-w-[430px] text-[11px] leading-5 text-black/40">
        Your Nexus account is configured. Hit the button below and let&apos;s
        get this thing moving.
      </p>

      <div className="mx-auto mt-8 grid max-w-[450px] grid-cols-3 gap-2">
        {[
          ["Email", email],
          ["Name", name],
          ["Theme", themes.find((x) => x.id === theme)?.name],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-black/[0.06] bg-[#fafaf9] px-3 py-3 text-left"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-black/30">
              {label}
            </p>

            <p className="mt-1 truncate text-[10px] font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
