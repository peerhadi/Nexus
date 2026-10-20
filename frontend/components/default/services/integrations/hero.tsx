"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Layers3 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import HeroVisual from "./hero-visual";

export default function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const handlePointer = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handlePointer}
      className="relative px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pt-32"
    >
      <div className="integration-grid absolute inset-0 -z-10" />

      <div
        className="integration-glow -z-10 h-80 w-80"
        style={{
          left: `${pointer.x * 0.35}%`,
          top: `${pointer.y * 0.3}%`,
          background: "var(--accent)",
          transition: "left 300ms ease, top 300ms ease",
        }}
      />

      <div
        className="integration-glow -z-10 h-72 w-72"
        style={{
          right: "8%",
          top: "15%",
          background: "#57c8c0",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            SYSTEMS THAT WORK TOGETHER
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[4.7rem]">
            Your tools.
            <br />
            <span className="integration-kicker">One connected</span>
            <br />
            system.
          </h1>

          <p className="integration-muted mt-7 max-w-xl text-base leading-8 sm:text-lg">
            Your software should share information, trigger actions, and stay
            in sync. We connect the pieces behind your business so work moves
            without the constant copy, paste, and switching.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/build"
              className="integration-button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Start a project <ArrowUpRight size={17} />
            </Link>
            <Link
              href="/services"
              className="integration-button-secondary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              <Layers3 size={16} /> All services
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs integration-muted">
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="integration-kicker" /> Custom API
              connections
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="integration-kicker" /> Event-driven
              workflows
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={14} className="integration-kicker" /> Built around
              your stack
            </span>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
