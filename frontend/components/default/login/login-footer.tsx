"use client";

import { LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-black/25">
      <LockKeyhole size={9} />

      <span>Your connection is protected</span>

      <span className="mx-1 text-black/15">·</span>

      <Link href="/home" className="transition hover:text-black/60">
        Back to Nexus
      </Link>
    </div>
  );
}
