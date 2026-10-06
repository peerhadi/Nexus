"use client";

import { FloatingBlob } from "./background";

export default function BigStatement() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface)] px-5 py-36 sm:px-8 lg:px-12 lg:py-52">
      <FloatingBlob
        className="-left-[10%] top-[20%] h-[600px] w-[600px]"
        color="rgba(167,139,250,0.18)"
        duration={17}
      />

      <FloatingBlob
        className="right-[-10%] bottom-[-15%] h-[600px] w-[600px]"
        color="rgba(56,189,248,0.16)"
        duration={21}
      />

      <div className="relative mx-auto max-w-[1250px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
          002 — Our standard
        </p>

        <h2 className="mt-10 text-[clamp(3.7rem,8vw,9rem)] font-black leading-[0.9] tracking-[-0.09em]">
          IF IT&apos;S GOING TO EXIST,
          <br />
          <span className="text-[var(--text-disabled)]">MAKE IT</span>
          <br />
          <span className="bg-[var(--gradient-primary)] bg-clip-text ">
            INCREDIBLE.
          </span>
        </h2>

        <p className="mx-auto mt-14 max-w-2xl text-lg leading-8 text-[var(--text-tertiary)]">
          We care about the architecture, the interaction, the tiny details, the
          ridiculous details, and the moment when someone uses the thing and
          immediately understands why it exists.
        </p>
      </div>
    </section>
  );
}
