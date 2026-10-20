"use client";

import { useCallback, useState, type MouseEvent } from "react";
import { Sparkles } from "lucide-react";

export default function FloatingScene({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "wide" | "compact";
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const move = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }, []);

  const leave = useCallback(() => {
    setPosition({ x: 0.5, y: 0.5 });
  }, []);

  const dx = position.x - 0.5;
  const dy = position.y - 0.5;

  const objects = [
    {
      className: "left-[9%] top-[17%] h-16 w-16 sm:h-20 sm:w-20",
      depth: 34,
      shape: "cube",
    },
    {
      className: "right-[12%] top-[15%] h-14 w-14 sm:h-[72px] sm:w-[72px]",
      depth: -26,
      shape: "sphere",
    },
    {
      className: "bottom-[19%] left-[15%] h-14 w-14 sm:h-[76px] sm:w-[76px]",
      depth: -42,
      shape: "diamond",
    },
    {
      className: "bottom-[15%] right-[11%] h-16 w-16 sm:h-24 sm:w-24",
      depth: 48,
      shape: "ring",
    },
    {
      className: "left-[47%] top-[7%] h-8 w-8 sm:h-11 sm:w-11",
      depth: 24,
      shape: "orb",
    },
    {
      className: "right-[7%] top-[52%] h-8 w-8 sm:h-12 sm:w-12",
      depth: -18,
      shape: "star",
    },
    {
      className: "left-[5%] top-[55%] h-7 w-7 sm:h-9 sm:w-9",
      depth: 16,
      shape: "orb",
    },
  ];

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, var(--selection), transparent 66%)",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-full border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-48 w-48"
            : variant === "wide"
              ? "h-[310px] w-[310px] sm:h-[390px] sm:w-[390px]"
              : "h-[280px] w-[280px] sm:h-[390px] sm:w-[390px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * -24}px), calc(-50% + ${dy * -24}px)) rotateX(${dy * 24}deg) rotateY(${dx * 24}deg)`,
          transition: "transform 180ms ease-out",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-[42%] border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-36 w-52"
            : "h-[220px] w-[310px] sm:h-[270px] sm:w-[390px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * 35}px), calc(-50% + ${dy * 35}px)) rotateX(${55 + dy * 16}deg) rotateY(${dx * 28}deg) rotate(-30deg)`,
          transition: "transform 180ms ease-out",
        }}
      />

      <div
        className={`absolute left-1/2 top-1/2 rounded-full border border-[var(--card-border)] ${
          variant === "compact"
            ? "h-32 w-32"
            : "h-[200px] w-[200px] sm:h-[260px] sm:w-[260px]"
        }`}
        style={{
          transform: `translate(calc(-50% + ${dx * -40}px), calc(-50% + ${dy * -40}px)) rotateX(${dy * 38}deg) rotateY(${70 + dx * 22}deg) rotate(52deg)`,
          transition: "transform 220ms ease-out",
        }}
      />

      {objects.map((object, index) => (
        <div
          key={object.shape + index}
          className={`pointer-events-none absolute ${object.className}`}
          style={{
            transform: `translate3d(${dx * object.depth}px, ${dy * object.depth}px, 0) rotateX(${dy * 35 + index * 8}deg) rotateY(${dx * 42 + index * 13}deg) rotate(${index * 19}deg)`,
            transition: "transform 160ms ease-out",
          }}
        >
          {object.shape === "cube" && (
            <div className="relative h-full w-full [transform-style:preserve-3d]">
              <div className="absolute inset-0 border border-[var(--accent)] bg-[var(--accent)] opacity-20 [transform:translateZ(16px)]" />
              <div className="absolute inset-0 border border-[var(--text-primary)] opacity-50 [transform:rotateY(60deg)]" />
              <div className="absolute inset-0 border border-[var(--accent)] opacity-80 [transform:rotateX(60deg)]" />
            </div>
          )}

          {object.shape === "sphere" && (
            <div className="relative h-full w-full rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] shadow-[var(--shadow-md)]">
              <div className="absolute left-[18%] top-[14%] h-[24%] w-[24%] rounded-full bg-[var(--text-primary)] opacity-50 blur-[5px]" />
              <div className="absolute inset-[16%] rounded-full border border-[var(--accent)] opacity-50" />
              <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-10 blur-xl" />
            </div>
          )}

          {object.shape === "diamond" && (
            <div className="relative h-full w-full rotate-45 border border-[var(--accent)] bg-[var(--accent)] opacity-30 shadow-[var(--shadow-md)]">
              <div className="absolute inset-[18%] border border-[var(--text-primary)] opacity-80" />
            </div>
          )}

          {object.shape === "ring" && (
            <div className="absolute inset-[12%] rounded-full border-[5px] border-[var(--accent)] opacity-70 [transform:rotateX(65deg)] sm:border-[7px]">
              <div className="absolute inset-[20%] rounded-full border border-[var(--text-primary)] opacity-60" />
            </div>
          )}

          {object.shape === "orb" && (
            <div className="h-full w-full rounded-full border border-[var(--card-border)] bg-[var(--surface-secondary)] shadow-[var(--shadow-md)]">
              <div className="ml-[20%] mt-[18%] h-[22%] w-[22%] rounded-full bg-[var(--text-primary)] opacity-60 blur-[2px]" />
            </div>
          )}

          {object.shape === "star" && (
            <Sparkles
              className="h-full w-full text-[var(--accent)]"
              strokeWidth={0.8}
            />
          )}
        </div>
      ))}
    </div>
  );
}
