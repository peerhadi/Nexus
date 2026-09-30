"use client";

import { Sparkles } from "lucide-react";

export default function SignupHeader() {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-[42px] font-semibold tracking-[-0.06em] leading-[1.05] sm:text-[54px]">
        Let&apos;s build your
        <span className="relative ml-2 inline-block">
          <span className="relative z-10">Nexus.</span>
          <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600)] opacity-40 blur-md" />
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-5 text-black/40">
        A few quick choices, then you&apos;re in. You can change everything
        later.
      </p>
    </div>
  );
}
