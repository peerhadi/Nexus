export default function PageStyles() {
  return (
    <style jsx global>{`
      .integration-page {
        --integration-line: var(--card-border);
        --integration-panel: var(--surface-secondary);
        position: relative;
        color: var(--text-primary);
        isolation: isolate;
      }

      .integration-page * {
        box-sizing: border-box;
      }

      .integration-page .integration-grid {
        background-image:
          linear-gradient(
            to right,
            var(--integration-line) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            var(--integration-line) 1px,
            transparent 1px
          );
        background-size: 42px 42px;
        mask-image: linear-gradient(to bottom, black, transparent 95%);
        opacity: 0.27;
      }

      .integration-page .integration-glow {
        position: absolute;
        border-radius: 999px;
        pointer-events: none;
        filter: blur(60px);
        opacity: 0.24;
        will-change: transform;
      }

      .integration-page .integration-orb {
        transform-style: preserve-3d;
        animation: integration-orbit 9s ease-in-out infinite;
        will-change: transform;
      }

      .integration-page .integration-orb:nth-child(2n) {
        animation-delay: -3s;
        animation-duration: 12s;
      }

      .integration-page .integration-orb:nth-child(3n) {
        animation-delay: -5s;
        animation-duration: 15s;
      }

      .integration-page .integration-float {
        animation: integration-float 6s ease-in-out infinite;
      }

      .integration-page .integration-float-delay {
        animation: integration-float 7s ease-in-out -2.5s infinite;
      }

      .integration-page .integration-ring {
        animation: integration-spin 26s linear infinite;
        transform-origin: center;
      }

      .integration-page .integration-ring-reverse {
        animation: integration-spin 34s linear infinite reverse;
        transform-origin: center;
      }

      .integration-page .integration-node {
        transition:
          transform 240ms ease,
          border-color 240ms ease,
          box-shadow 240ms ease,
          background 240ms ease;
        transform-style: preserve-3d;
      }

      .integration-page .integration-node:hover {
        transform: translateY(-5px) rotateX(5deg) rotateY(-5deg);
      }

      .integration-page .integration-particle {
        offset-path: path("M 0 0 C 70 -50 130 50 200 0");
        animation: integration-particle 2.8s linear infinite;
      }

      .integration-page .integration-particle:nth-child(2) {
        animation-delay: -0.8s;
      }

      .integration-page .integration-particle:nth-child(3) {
        animation-delay: -1.6s;
      }

      .integration-page .integration-marquee {
        animation: integration-marquee 30s linear infinite;
        width: max-content;
      }

      .integration-page .integration-marquee:hover {
        animation-play-state: paused;
      }

      .integration-page .integration-flow-line {
        stroke-dasharray: 7 9;
        animation: integration-dash 1.3s linear infinite;
      }

      .integration-page .integration-flow-line.is-idle {
        animation-duration: 3.2s;
        opacity: 0.42;
      }

      .integration-page .integration-card {
        background: var(--card);
        border: 1px solid var(--card-border);
        box-shadow: var(--shadow-md);
      }

      .integration-page .integration-muted {
        color: var(--text-secondary);
      }

    `}</style>
  );
}
