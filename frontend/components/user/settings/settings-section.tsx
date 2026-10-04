"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-disabled)]">
          {title}
        </div>

        <h2 className="mt-1 text-xl font-black tracking-tight text-[var(--text-primary)]">
          {title} settings
        </h2>

        <p className="mt-1 text-[10px] font-medium text-[var(--text-muted)]">
          {description}
        </p>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_12px_40px_rgba(0,0,0,0.035)]">
        {children}
      </div>
    </motion.section>
  );
}
