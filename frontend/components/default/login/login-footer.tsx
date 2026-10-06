"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-[var(--text-muted)]">
      <LockKeyhole size={9} />

      <span>Your connection is protected</span>

      <span className="mx-1 text-[var(--text-disabled)]">·</span>

      <Link href="/" className="transition hover:text-[var(--text-secondary)]">
        Back to Nexus
      </Link>
    </div>
  );
}
