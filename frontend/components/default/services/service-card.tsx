"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "./data";
import ServiceVisual from "./service-visual";

export default function ServiceCard({
  service,
  index,
  reduceMotion,
}: {
  service: (typeof services)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const Icon = service.icon;

  return (
    <motion.article
      key={service.number}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="group relative isolate overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[var(--card)] transition-colors duration-300 hover:bg-[var(--surface-secondary)] sm:rounded-[34px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[430px] w-[430px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_68%)] opacity-70 transition-transform duration-700 group-hover:scale-125"
      />
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col p-6 sm:p-9 lg:p-11">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--surface-secondary)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-black tracking-wider text-[var(--text-muted)]">
              {service.number}
            </span>
          </div>

          <p className="mt-10 text-[9px] font-bold uppercase tracking-[0.23em] text-[var(--text-muted)] sm:text-[10px]">
            {service.label}
          </p>
          <h3 className="mt-3 max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl lg:text-6xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            {service.description}
          </p>

          <Link
            href={service.href}
            className="group/link mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-bold !text-white transition-transform hover:translate-x-1"
          >
            Explore service
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>

        <div className="relative flex min-h-[300px] flex-col justify-center overflow-hidden border-t border-[var(--card-border)] px-5 py-7 sm:px-9 lg:border-l lg:border-t-0 lg:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.07),transparent_65%)]" />
          </div>
          <div className="relative z-10">
            <ServiceVisual
              type={service.visual}
              reduceMotion={reduceMotion}
            />
          </div>
          <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--surface-secondary)]">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)] sm:text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="relative mt-4 text-xs leading-5 text-[var(--text-muted)]">
            {service.detail}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 transition-transform duration-700 group-hover:scale-x-100" />
    </motion.article>
  );
}
