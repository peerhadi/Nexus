"use client";

import {
  Check,
  Mail,
  MapPin,
  Palette,
  Sparkles,
  UserRound,
} from "lucide-react";

export type Step = 0 | 1 | 2 | 3 | 4;

const steps = [
  {
    label: "Email",
    icon: Mail,
  },
  {
    label: "Identity",
    icon: UserRound,
  },
  {
    label: "Location",
    icon: MapPin,
  },
  {
    label: "Theme",
    icon: Palette,
  },
  {
    label: "Finish",
    icon: Sparkles,
  },
];

export default function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-between">
      <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-black/[0.06]" />

      <div
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[linear-gradient(90deg,#ff00cc,#00e5ff,#a8ff00,#ffe600,#ff4d00)] transition-all duration-700 ease-out"
        style={{
          width: `${(step / (steps.length - 1)) * 100}%`,
        }}
      />

      {steps.map((item, index) => {
        const Icon = item.icon;
        const completed = index < step;
        const current = index === step;

        return (
          <div key={item.label} className="relative z-10">
            <div
              className={[
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500",
                completed
                  ? "scale-95 border-black bg-black text-white"
                  : current
                    ? "scale-110 border-black bg-white text-black shadow-[0_0_0_5px_rgba(0,0,0,0.04),0_0_25px_rgba(0,229,255,0.35)]"
                    : "border-black/[0.08] bg-white text-black/25",
              ].join(" ")}
            >
              {completed ? (
                <Check size={14} strokeWidth={2.5} />
              ) : (
                <Icon size={14} strokeWidth={1.8} />
              )}
            </div>

            <span
              className={[
                "absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold transition-all",
                current ? "text-black" : "text-black/30",
              ].join(" ")}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
