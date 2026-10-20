"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Workflow, Zap } from "lucide-react";

export default function VisualAutomation({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="relative mx-auto flex min-h-[290px] w-full max-w-[390px] items-center justify-center">
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute h-64 w-64 rounded-full border border-dashed border-pink-400/40"
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 27, repeat: Infinity, ease: "linear" }}
        className="absolute h-48 w-48 rounded-full border border-violet-400/30"
      />
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/60 bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-300 text-white shadow-[0_20px_60px_rgba(217,70,180,0.25)]">
        <Workflow className="h-10 w-10" />
      </div>
      {[
        { className: "-left-1 top-9", icon: "mail" },
        { className: "right-0 top-12", icon: "check" },
        { className: "bottom-5 left-9", icon: "zap" },
        { className: "bottom-7 right-8", icon: "clock" },
      ].map((item, index) => (
        <motion.div
          key={item.icon}
          animate={
            reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -7 : 7, 0] }
          }
          transition={{ ...transition, delay: index * 0.2 }}
          className={`absolute ${item.className} flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-lg`}
        >
          {item.icon === "mail" && (
            <Workflow className="h-5 w-5 text-violet-500" />
          )}
          {item.icon === "check" && (
            <Check className="h-5 w-5 text-emerald-500" />
          )}
          {item.icon === "zap" && <Zap className="h-5 w-5 text-pink-500" />}
          {item.icon === "clock" && (
            <CreditCard className="h-5 w-5 text-orange-400" />
          )}
        </motion.div>
      ))}
      <svg
        viewBox="0 0 360 280"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 75 Q92 75 126 115 M318 80 Q264 80 230 115 M75 245 Q105 218 132 170 M290 240 Q260 220 230 170"
          stroke="currentColor"
          strokeOpacity=".2"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      </svg>
    </div>
  );
}
