"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function DesignLabHeader({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end mt-25"
    >
      <div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
          Turn an idea into a{" "}
          <span
            style={{
              background: "var(--gradient-primary)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            visual direction.
          </span>
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm leading-7"
          style={{ color: "var(--text-secondary)" }}
        >
          Choose a site type, set the visual mood, add your own imagery, and
          preview a complete responsive layout.
        </p>
      </div>

      <button
        onClick={onReset}
        className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:-translate-y-0.5"
        style={{
          borderColor: "var(--accent)",
          background: "var(--background)",
        }}
      >
        <RotateCcw size={14} />
        Reset lab
      </button>
    </motion.div>
  );
}
