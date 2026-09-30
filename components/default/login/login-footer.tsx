"use client";

import { LockKeyhole } from "lucide-react";

export default function LoginFooter() {
  return (
    <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-black/25">
      <LockKeyhole size={9} />

      <span>Your connection is protected</span>

      <span className="mx-1 text-black/15">·</span>

      <a href="/" className="transition hover:text-black/60">
        Back to Nexus
      </a>
    </div>
  );
}
