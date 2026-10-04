"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Layers3,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { FloatingBlob } from "./background";

const capabilityIcons = {
  Workflow,
  Code2,
  Bot,
  Layers3,
  Terminal,
  Sparkles,
};

const capabilities = [
  ["Automation", "Workflow"],
  ["Applications", "Code2"],
  ["AI Systems", "Bot"],
  ["Interfaces", "Layers3"],
  ["Infrastructure", "Terminal"],
  ["Experiments", "Sparkles"],
] as const;

export default function Capabilities() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-secondary)] px-5 py-36 sm:px-8 lg:px-12 lg:py-48">
      <FloatingBlob
        className="-right-[15%] -top-[20%] h-[650px] w-[650px]"
        color="rgba(217,70,239,0.18)"
        duration={19}
      />

      <div className="relative mx-auto max-w-[1450px]">
        <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              004 — The toolkit
            </p>

            <h2 className="mt-8 text-[clamp(3.8rem,7vw,7.5rem)] font-black leading-[0.86] tracking-[-0.09em]">
              A LOT OF
              <br />
              <span className="text-[var(--text-disabled)]">WAYS TO</span>
              <br />
              <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                BUILD.
              </span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map(([name, iconName], index) => {
              const Icon = capabilityIcons[iconName];

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{
                    y: -5,
                    rotate: index % 2 === 0 ? -1 : 1,
                  }}
                  className="group flex min-h-[125px] items-center gap-5 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm backdrop-blur-xl transition-shadow duration-500 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-white transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold">{name}</p>

                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Built with precision.
                    </p>
                  </div>

                  <ArrowUpRight className="ml-auto h-4 w-4 text-[var(--text-disabled)] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--text-primary)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
