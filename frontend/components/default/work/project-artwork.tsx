"use client";

import { useReducedMotion } from "framer-motion";

export default function ProjectArtwork({ type }: { type: string }) {
  const reducedMotion = useReducedMotion();

  const float = (duration: number, distance = 12) =>
    reducedMotion
      ? {}
      : {
          y: [0, -distance, 0],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  if (type === "prism") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[inherit]">
        <img src="/screenshots/projects/prism/home.png" />
      </div>
    );
  }

  if (type === "obsidian") {
    return (
      <div
        className="relative h-full min-h-[428px] overflow-hidden rounded-[inherit] w-full flex justify-center"
        style={{
          background:
            "linear-gradient(135deg,#090014 0%,#190038 35%, #310078 68%, #130024 100%)",
        }}
      >
        <img
          src="/screenshots/projects/obsidian/home.png"
          style={{ height: "428px" }}
        />
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="relative h-full min-h-[330px] overflow-hidden rounded-[inherit]">
        <img
          src="/screenshots/projects/notifier/home.png"
          style={{ height: "428px", width: "100%" }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[430px] overflow-hidden rounded-[inherit]">
      <img
        src="/screenshots/projects/engine/home.png"
        style={{ height: "428px", width: "100%" }}
      />
    </div>
  );
}
