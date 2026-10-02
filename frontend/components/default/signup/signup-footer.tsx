"use client";

import { LockKeyhole } from "lucide-react";

export default function SignupFooter() {
  return (
    <div className="mt-7 flex items-center justify-center gap-2 text-[14px] text-black/30">
      <span>Already have an account?</span>

      <a
        href="/login"
        className="font-semibold text-black/55 underline decoration-black/15 underline-offset-4 transition hover:text-black"
      >
        Sign in
      </a>

      <span className="mx-1 text-black/15">·</span>

      <span className="flex items-center gap-1">
        <LockKeyhole size={9} />
        Secure onboarding
      </span>
    </div>
  );
}
