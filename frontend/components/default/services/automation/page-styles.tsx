export default function PageStyles() {
  return (
    <style jsx global>{`
      .automation-page {
        --automation-glow: var(--selection);
      }

      .automation-page .automation-eyebrow {
        background: var(--card);
      }

      .automation-page .automation-pulse {
        box-shadow: 0 0 12px var(--accent);
        animation: automation-pulse 2s ease-in-out infinite;
      }

      .automation-page .automation-service-card {
        isolation: isolate;
      }

      .automation-page .service-card-glow {
        position: absolute;
        top: -75px;
        right: -75px;
        width: 175px;
        height: 175px;
        border-radius: 50%;
        opacity: 0.11;
        filter: blur(45px);
        transition:
          opacity 300ms ease,
          transform 500ms ease;
        pointer-events: none;
      }

      .automation-page .automation-service-card:hover .service-card-glow {
        opacity: 0.5;
        transform: scale(1.45);
      }

      .automation-page
        .automation-service-card:hover
        .automation-service-icon {
        border-color: var(--accent);
        box-shadow: 0 0 22px var(--selection);
        transform: translateY(-2px);
      }

      .automation-page .automation-cyan {
        background: var(--accent);
      }

      .automation-page .automation-violet {
        background: var(--accent);
        transform: translate(-15px, 15px);
      }

      .automation-page .automation-blue {
        background: var(--accent);
        transform: translate(-15px, 15px);
      }

      .automation-page .automation-pink {
        background: var(--accent);
      }

      .automation-page .automation-orange {
        background: var(--accent);
        transform: translate(-15px, 15px);
      }

      .automation-page .automation-green {
        background: var(--accent);
      }

      .automation-page .automation-workflow-option:focus-visible,
      .automation-page button:focus-visible,
      .automation-page a:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 4px;
      }
      .automation-heading-glow {
        color: var(--text-primary);
        text-shadow:
          0 0 24px var(--selection),
          0 0 55px var(--selection);
      }

      .automation-band-glow {
        background:
          radial-gradient(
            ellipse at 15% 35%,
            var(--selection),
            transparent 45%
          ),
          radial-gradient(
            ellipse at 90% 70%,
            var(--selection),
            transparent 38%
          );
        opacity: 0.48;
        animation: automation-band-breathe 8s ease-in-out infinite;
      }

      .automation-page .automation-control-panel {
        box-shadow: 0 10px 40px var(--selection);
      }

      .automation-page .automation-safeguard {
        animation: automation-safeguard-in 550ms ease both;
      }

      .automation-page .automation-principle {
        animation: automation-principle-in 600ms ease both;
      }

      .automation-page .automation-final-cta {
        isolation: isolate;
      }

      .automation-page .automation-cta-glow {
        background:
          radial-gradient(
            ellipse at 15% 80%,
            var(--selection),
            transparent 48%
          ),
          radial-gradient(ellipse at 85% 15%, var(--accent), transparent 45%);
        opacity: 0.28;
        animation: automation-cta-breathe 7s ease-in-out infinite;
      }

      .automation-page .automation-cta-orbit {
        animation: automation-orbit 32s linear infinite;
      }

      .automation-page .cta-orbit-two {
        animation-direction: reverse;
        animation-duration: 23s;
      }
    `}</style>
  );
}
