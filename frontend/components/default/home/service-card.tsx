"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Service = {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative min-h-[430px] overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm backdrop-blur-xl sm:p-10"
    >
      <div
        className={`absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br ${service.accent} opacity-70 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white"
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        <span className="text-xs font-bold text-[var(--text-disabled)]">
          {service.number}
        </span>
      </div>

      <div className="relative mt-28">
        <h3 className="text-3xl font-black tracking-[-0.05em]">
          {service.title}
        </h3>

        <p className="mt-5 max-w-sm leading-7 text-[var(--text-tertiary)]">
          {service.description}
        </p>

        <div className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)] transition-all duration-300 group-hover:gap-4 group-hover:text-[var(--text-primary)]">
          Explore
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="absolute bottom-0 left-8 right-8 h-px overflow-hidden bg-[var(--surface-hover)]">
        <motion.div
          className="h-full w-full origin-left bg-[var(--gradient-primary)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
      </div>
    </motion.div>
  );
}
