export default function HeroVisualStyles() {
  return (
    <style jsx global>{`
      .automation-page .automation-hero-visual {
        --mx: 0px;
        --my: 0px;
        isolation: isolate;
        background: var(--surface-secondary);
      }

      .automation-page .automation-hero-glow {
        background:
          radial-gradient(
            ellipse at 50% 45%,
            var(--selection),
            transparent 56%
          ),
          radial-gradient(ellipse at 85% 20%, var(--accent), transparent 40%),
          radial-gradient(ellipse at 10% 90%, var(--accent), transparent 36%);
        opacity: 0.42;
        transform: translate3d(var(--mx), var(--my), 0);
        transition: transform 250ms ease-out;
        animation: automation-glow-breathe 7s ease-in-out infinite;
      }

      .automation-page .automation-grid {
        background-image: radial-gradient(
          var(--card-border) 1px,
          transparent 1px
        );
        background-size: 22px 22px;
        opacity: 0.7;
        mask-image: linear-gradient(
          to bottom,
          transparent,
          black 20%,
          black 80%,
          transparent
        );
      }

      .automation-page .automation-hero-orbit {
        border-style: dashed;
        opacity: 0.7;
      }

      .automation-page .hero-orbit-a {
        animation: automation-orbit 32s linear infinite;
      }

      .automation-page .hero-orbit-b {
        border-style: dotted;
        opacity: 0.6;
        animation: automation-orbit-reverse 25s linear infinite;
      }

      .automation-page .automation-orbit-dot {
        z-index: 1;
        box-shadow: 0 0 15px var(--accent);
        animation: automation-dot-pulse 2.5s ease-in-out infinite;
      }

      .automation-page .dot-two {
        animation-delay: -0.8s;
      }

      .automation-page .dot-three {
        animation-delay: -1.6s;
      }

      .automation-page .automation-hero-shape {
        z-index: 2;
        transform: translate3d(var(--mx), var(--my), 0);
        transition: transform 300ms ease-out;
      }

      .automation-page .shape-torus {
        width: 49px;
        height: 49px;
        border: 9px solid var(--accent);
        border-radius: 50%;
        opacity: 0.8;
        box-shadow:
          0 0 13px var(--selection),
          inset 0 0 12px var(--selection);
        animation: automation-torus 6s ease-in-out infinite;
      }

      .automation-page .shape-torus div {
        position: absolute;
        inset: 4px;
        border: 1px solid var(--card-border);
        border-radius: 50%;
      }

      .automation-page .shape-crystal {
        width: 45px;
        height: 45px;
        transform-style: preserve-3d;
        animation: automation-crystal 8s ease-in-out infinite;
      }

      .automation-page .shape-crystal div {
        width: 100%;
        height: 100%;
        border: 1px solid var(--accent);
        background: var(--selection);
        transform: rotate(45deg) skew(-8deg, -8deg);
        box-shadow: 0 0 24px var(--selection);
        opacity: 0.8;
      }

      .automation-page .shape-sphere {
        width: 45px;
        height: 45px;
        border: 1px solid var(--accent);
        border-radius: 50%;
        background: radial-gradient(
          circle at 30% 25%,
          var(--card),
          var(--accent)
        );
        box-shadow: inset -10px -9px 16px var(--selection);
        opacity: 0.75;
        animation: automation-sphere 7s ease-in-out infinite;
      }

      .automation-page .shape-sphere div {
        width: 9px;
        height: 9px;
        margin: 8px;
        border-radius: 50%;
        background: var(--card);
      }

      .automation-page .shape-wire {
        width: 43px;
        height: 43px;
        border: 1px solid var(--accent);
        transform: rotate(45deg);
        animation: automation-wire 7s ease-in-out infinite;
      }

      .automation-page .shape-wire div {
        position: absolute;
        inset: 7px;
        border: 1px solid var(--accent);
      }

      .automation-page .automation-flow-line {
        z-index: 1;
        height: 1px;
        transform-origin: left;
        background: linear-gradient(
          90deg,
          transparent,
          var(--accent),
          transparent
        );
        opacity: 0.8;
        filter: drop-shadow(0 0 5px var(--accent));
      }

      .automation-page .flow-line-one {
        left: 10%;
        top: 42%;
        width: 30%;
        transform: rotate(12deg);
        animation: automation-line-glow 3s ease-in-out infinite;
      }

      .automation-page .flow-line-two {
        right: 8%;
        top: 45%;
        width: 24%;
        transform: rotate(-18deg);
        animation: automation-line-glow 3s ease-in-out infinite -1s;
      }

      .automation-page .flow-line-three {
        bottom: 22%;
        left: 15%;
        width: 29%;
        transform: rotate(-15deg);
        animation: automation-line-glow 3s ease-in-out infinite -2s;
      }

      .automation-page .automation-center-card {
        box-shadow:
          0 0 0 1px var(--card-border),
          0 18px 55px var(--selection);
        animation: automation-card-hover 6s ease-in-out infinite;
      }

      .automation-page .automation-center-icon {
        box-shadow: 0 0 24px var(--selection);
      }

      .automation-page .automation-mini-step {
        transition:
          border-color 300ms ease,
          transform 300ms ease,
          box-shadow 300ms ease;
      }

      .automation-page .automation-mini-step:nth-child(1) {
        animation: automation-step-glow 4s ease-in-out infinite;
      }

      .automation-page .automation-mini-step.step-delay-one {
        animation: automation-step-glow 4s ease-in-out infinite -1.3s;
      }

      .automation-page .automation-mini-step.step-delay-two {
        animation: automation-step-glow 4s ease-in-out infinite -2.6s;
      }

      .automation-page .automation-live-indicator {
        box-shadow: 0 0 16px var(--selection);
      }

      .automation-page .automation-status-dot {
        box-shadow: 0 0 12px var(--accent);
        animation: automation-dot-pulse 1.8s ease-in-out infinite;
      }

      .automation-page .automation-float-card {
        animation: automation-float-card 6s ease-in-out infinite;
      }

      .automation-page .float-card-right {
        animation-delay: -3s;
      }

    `}</style>
  );
}
