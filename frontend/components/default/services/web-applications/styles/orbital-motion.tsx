export default function OrbitalMotion() {
  return (
    <style jsx>{`
@keyframes orbit-spin {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}

@keyframes ring-float {
  0%,
  100% {
    transform: translateY(0) rotateX(35deg);
  }
  50% {
    transform: translateY(-13px) rotateX(35deg) rotateY(25deg);
  }
}

@keyframes cube-float {
  0%,
  100% {
    transform: rotateX(-18deg) rotateY(25deg) translateY(0);
  }
  50% {
    transform: rotateX(25deg) rotateY(100deg) translateY(-14px);
  }
}

@keyframes diamond-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -14px;
  }
}

@keyframes sphere-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 8px -12px;
  }
}

@keyframes cross-float {
  0%,
  100% {
    transform: rotate(0deg) translateY(0);
  }
  50% {
    transform: rotate(45deg) translateY(-10px);
  }
}

@keyframes chip-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit,
  .scene-geometry,
  .floating-chip {
    animation: none !important;
    transition: none !important;
  }

  .interface-window {
    transition: none !important;
  }
}
    `}</style>
  );
}
