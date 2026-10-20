"use client";

export default function PlaygroundStyles() {
  return (
    <style jsx global>{`
      .playground-page {
        --pg-line: color-mix(in srgb, var(--text-primary) 11%, transparent);
        --pg-muted: color-mix(in srgb, var(--text-primary) 4%, transparent);
      }

      .playground-range {
        height: 3px;
        appearance: none;
        border-radius: 999px;
        background: color-mix(in srgb, var(--text-primary) 12%, transparent);
        accent-color: var(--accent);
      }

      .playground-range::-webkit-slider-thumb {
        appearance: none;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid var(--background);
        box-shadow:
          0 0 0 1px var(--accent),
          0 0 14px color-mix(in srgb, var(--accent) 50%, transparent);
      }

      .playground-range::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid var(--background);
        box-shadow: 0 0 14px
          color-mix(in srgb, var(--accent) 50%, transparent);
      }

      .playground-color {
        border: 1px solid var(--pg-line);
        border-radius: 12px;
        background: var(--background);
        padding: 3px;
      }

      .playground-color::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      .playground-color::-webkit-color-swatch {
        border: 0;
        border-radius: 8px;
      }

      .playground-grid {
        background-image:
          linear-gradient(var(--pg-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--pg-line) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(
          ellipse at center,
          black 0%,
          transparent 74%
        );
      }

      @keyframes playground-enter {
        from {
          opacity: 0;
          transform: translateY(14px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .playground-enter {
        animation: playground-enter 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
      }

      .playground-enter-delay {
        animation: playground-enter 800ms 100ms cubic-bezier(0.2, 0.7, 0.2, 1)
          both;
      }

      @media (prefers-reduced-motion: reduce) {
        .playground-enter,
        .playground-enter-delay {
          animation: none;
        }
      }
    `}</style>
  );
}
