"use client";

import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import BuildBackground from "./build-background";

export default function Submitted() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <BuildBackground submitted />

      <div className="relative flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="w-full max-w-[680px]">
          <div className="relative overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-12">
            <div className="absolute inset-x-0 top-0 h-1 overflow-hidden">
              <div className="h-full w-full animate-[rainbow_4s_linear_infinite] bg-[linear-gradient(90deg,#ff0080,#ff8a00,#ffe600,#00e676,#00c8ff,#7c3aed,#ff0080)] bg-[length:300%_100%]" />
            </div>

            <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
              <div className="relative mb-7">
                <div className="absolute inset-0 animate-ping rounded-[26px] bg-emerald-300/40" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] bg-[var(--accent)] text-[var(--accent-contrast)] shadow-2xl">
                  <CircleCheck size={38} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)]">
                <Sparkles size={12} />
                Message received
                <Sparkles size={12} />
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.055em] sm:text-6xl">
                You just started
                <br />
                <span className="bg-[linear-gradient(90deg,#ff0080,#7c3aed,#00c8ff,#00c853)] bg-clip-text ">
                  something.
                </span>
              </h1>

              <p className="mt-6 max-w-[470px] text-sm leading-7 text-[var(--text-tertiary)]">
                Your request is on its way to the Nexus team. We’ll take a look
                and get back to you with the next steps.
              </p>

              <div className="mt-9 grid w-full gap-3 sm:grid-cols-2">
                <a
                  href="/"
                  className="group flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] text-xs font-black text-[var(--accent-contrast)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                >
                  Back to Nexus
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="/build"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-xs font-black transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
                >
                  Send another
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(20px, -24px, 0);
          }
        }

        @keyframes rainbow {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 300% 50%;
          }
        }
      `}</style>
    </main>
  );
}
