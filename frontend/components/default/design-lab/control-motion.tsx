"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { animationOptions } from "@/components/default/design-lab/data";
import type { AnimationType } from "@/components/default/design-lab/types";

export default function ControlMotion({
  animation,
  setAnimation,
}: {
  animation: AnimationType;
  setAnimation: (animation: AnimationType) => void;
}) {
  return (
    <section>
      <label className="mb-3 block text-xs font-semibold text-[var(--text-primary)]">
        04 / Motion style
      </label>

      <div className="space-y-2">
        {animationOptions.map((item) => {
          const active = animation === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setAnimation(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-[var(--surface)] text-[var(--accent-active)]"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                }`}
              >
                <motion.span
                  animate={
                    active && item.id !== "none"
                      ? item.id === "float"
                        ? { y: [0, -3, 0] }
                        : item.id === "fade"
                          ? { opacity: [0.35, 1, 0.35] }
                          : { scale: [1, 1.12, 1] }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={14} />
                </motion.span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-[var(--text-primary)]">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[10px] text-[var(--text-secondary)]">
                  {item.description}
                </span>
              </span>

              {active && (
                <Check
                  size={13}
                  className="text-[var(--accent-active)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
