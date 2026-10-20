export default function AnimationStyles() {
  return (
    <style jsx global>{`
      @keyframes automation-pulse {
        0%,
        100% {
          opacity: 1;
          box-shadow: 0 0 12px var(--accent);
        }
        50% {
          opacity: 0.5;
          box-shadow: 0 0 24px var(--accent);
        }
      }

      @keyframes automation-glow-breathe {
        0%,
        100% {
          opacity: 0.28;
        }
        50% {
          opacity: 0.52;
        }
      }

      @keyframes automation-orbit {
        from {
          rotate: 0deg;
        }
        to {
          rotate: 360deg;
        }
      }

      @keyframes automation-orbit-reverse {
        from {
          rotate: 360deg;
        }
        to {
          rotate: 0deg;
        }
      }

      @keyframes automation-dot-pulse {
        0%,
        100% {
          opacity: 0.55;
          box-shadow: 0 0 7px var(--accent);
        }
        50% {
          opacity: 1;
          box-shadow: 0 0 20px var(--accent);
        }
      }

      @keyframes automation-torus {
        0%,
        100% {
          transform: rotateX(35deg) rotateY(0deg) translateY(0);
        }
        50% {
          transform: rotateX(35deg) rotateY(70deg) translateY(-15px);
        }
      }

      @keyframes automation-crystal {
        0%,
        100% {
          transform: rotateX(0deg) rotateY(0deg) translateY(0);
        }
        50% {
          transform: rotateX(55deg) rotateY(130deg) translateY(-14px);
        }
      }

      @keyframes automation-sphere {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }

      @keyframes automation-wire {
        0%,
        100% {
          transform: rotate(45deg) translateY(0);
        }
        50% {
          transform: rotate(135deg) translateY(-12px);
        }
      }

      @keyframes automation-line-glow {
        0%,
        100% {
          opacity: 0.25;
        }
        50% {
          opacity: 1;
        }
      }

      @keyframes automation-card-hover {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }

      @keyframes automation-step-glow {
        0%,
        100% {
          box-shadow: 0 0 0 transparent;
        }
        50% {
          box-shadow: 0 0 17px var(--selection);
        }
      }

      @keyframes automation-float-card {
        0%,
        100% {
          translate: 0 0;
        }
        50% {
          translate: 0 -10px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .automation-page *,
        .automation-page *::before,
        .automation-page *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
        }
      }
      @keyframes automation-band-breathe {
        0%,
        100% {
          opacity: 0.25;
        }
        50% {
          opacity: 0.6;
        }
      }

      @keyframes automation-safeguard-in {
        from {
          opacity: 0.4;
          transform: translateX(-7px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes automation-principle-in {
        from {
          opacity: 0.6;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes automation-cta-breathe {
        0%,
        100% {
          opacity: 0.18;
        }
        50% {
          opacity: 0.45;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .automation-page *,
        .automation-page *::before,
        .automation-page *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
