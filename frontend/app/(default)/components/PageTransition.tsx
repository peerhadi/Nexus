"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]">
      <div className="relative flex flex-col items-center">
        {/* Ambient glow */}
        <div className="absolute h-28 w-28 rounded-full bg-[var(--accent-soft)] blur-3xl" />

        {/* Nexus glass mark */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-lg)] backdrop-blur-xl">
          <div className="flex flex-col gap-[4px]">
            <span className="h-[3px] w-7 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]" />
            <span className="h-[3px] w-7 rounded-full bg-gradient-to-r from-[var(--accent-hover)] to-[var(--accent-active)]" />
            <span className="h-[3px] w-7 rounded-full bg-gradient-to-r from-[var(--accent-active)] to-[var(--accent)]" />
          </div>
        </div>

        {/* Brand */}
        <p className="mt-5 text-[11px] font-semibold tracking-[0.35em] text-[var(--text-primary)]">
          NEXUS
        </p>

        {/* Loading indicator */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-hover)] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-active)] [animation-delay:300ms]" />
        </div>

        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Getting things ready
        </p>
      </div>
    </div>
  );
}
