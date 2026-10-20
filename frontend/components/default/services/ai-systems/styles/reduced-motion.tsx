"use client";

export default function ReducedMotionStyles() {
  return (
    <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .ai-page *,
          .ai-page *::before,
          .ai-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
    `}</style>
  );
}
