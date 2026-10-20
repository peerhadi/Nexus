export default function ComponentStyles() {
  return (
    <style jsx global>{`
      .integration-page .integration-kicker {
        color: var(--accent);
      }

      .integration-page .integration-button-primary {
        color: white !important;
        background: var(--accent);
        transition:
          transform 200ms ease,
          box-shadow 200ms ease,
          filter 200ms ease;
      }

      .integration-page .integration-button-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 34px
          color-mix(in srgb, var(--accent) 26%, transparent);
        filter: brightness(1.06);
      }

      .integration-page .integration-button-secondary {
        border: 1px solid var(--card-border);
        background: var(--card);
        transition:
          transform 200ms ease,
          border-color 200ms ease;
      }

      .integration-page .integration-button-secondary:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
      }

      .integration-page .integration-faq {
        transition: border-color 200ms ease;
      }

      .integration-page .integration-faq:hover {
        border-color: var(--accent);
      }

      .integration-page .integration-faq-content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 260ms ease;
      }

      .integration-page .integration-faq-content.is-open {
        grid-template-rows: 1fr;
      }

      .integration-page .integration-faq-inner {
        overflow: hidden;
      }

      @keyframes integration-orbit {
        0%,
        100% {
          transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)
            rotateZ(0deg);
        }
        25% {
          transform: translate3d(12px, -17px, 20px) rotateX(15deg)
            rotateY(24deg) rotateZ(10deg);
        }
        50% {
          transform: translate3d(-8px, -25px, -12px) rotateX(-12deg)
            rotateY(38deg) rotateZ(20deg);
        }
        75% {
          transform: translate3d(-18px, -8px, 10px) rotateX(18deg)
            rotateY(10deg) rotateZ(-12deg);
        }
      }

      @keyframes integration-float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-14px) rotate(4deg);
        }
      }

      @keyframes integration-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes integration-particle {
        0% {
          offset-distance: 0%;
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        85% {
          opacity: 1;
        }
        100% {
          offset-distance: 100%;
          opacity: 0;
        }
      }

      @keyframes integration-marquee {
        to {
          transform: translateX(-50%);
        }
      }

      @keyframes integration-dash {
        to {
          stroke-dashoffset: -32;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .integration-page *,
        .integration-page *::before,
        .integration-page *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}
