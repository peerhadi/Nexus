export default function OrbitalScene() {
  return (
    <style jsx>{`
.interface-scene {
  --pointer-x: 0px;
  --pointer-y: 0px;
  isolation: isolate;
  perspective: 1000px;
}

.scene-glow {
  background:
    radial-gradient(
      circle at 52% 46%,
      var(--selection),
      transparent 45%
    ),
    radial-gradient(circle at 15% 80%, var(--accent), transparent 36%);
  opacity: 0.24;
}

.orbit {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orbit-one {
  animation: orbit-spin 32s linear infinite;
  border-style: dashed;
  opacity: 0.6;
}

.orbit-two {
  animation: orbit-spin 24s linear infinite reverse;
  border-style: dotted;
  opacity: 0.75;
}

.orbit-three {
  opacity: 0.6;
}

.scene-geometry {
  z-index: 1;
  transform: translate3d(var(--pointer-x), var(--pointer-y), 0)
    rotateX(-10deg) rotateY(16deg);
  transition: transform 450ms ease-out;
}

.geometry-ring {
  width: 52px;
  height: 52px;
  border: 8px solid var(--accent);
  border-radius: 50%;
  opacity: 0.7;
  animation: ring-float 7s ease-in-out infinite;
  box-shadow: 0 0 22px var(--selection);
}

.ring-core {
  position: absolute;
  inset: 5px;
  border: 1px solid var(--card-border);
  border-radius: 50%;
}

.geometry-cube {
  width: 42px;
  height: 42px;
  transform-style: preserve-3d;
  animation: cube-float 8s ease-in-out infinite;
}

.cube-face {
  position: absolute;
  width: 42px;
  height: 42px;
  border: 1px solid var(--accent);
  background: var(--selection);
  opacity: 0.7;
}

.cube-front {
  transform: translateZ(21px);
}

.cube-side {
  transform: rotateY(90deg) translateZ(21px);
  opacity: 0.35;
}

.cube-top {
  transform: rotateX(90deg) translateZ(21px);
  opacity: 0.5;
}

.geometry-diamond {
  width: 36px;
  height: 36px;
  transform: translate3d(var(--pointer-x), var(--pointer-y), 0)
    rotate(45deg);
  animation: diamond-float 6s ease-in-out infinite;
}

.geometry-diamond > div {
  width: 100%;
  height: 100%;
  border: 1px solid var(--accent);
  background: var(--selection);
  opacity: 0.65;
}

.geometry-sphere {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--card-border);
  background: radial-gradient(
    circle at 30% 25%,
    var(--card),
    var(--accent)
  );
  opacity: 0.7;
  box-shadow: inset -8px -8px 15px var(--selection);
  animation: sphere-float 9s ease-in-out infinite;
}

.sphere-highlight {
  position: absolute;
  left: 9px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--card);
  opacity: 0.85;
}

.geometry-cross {
  width: 22px;
  height: 22px;
  animation: cross-float 5s ease-in-out infinite;
}

.geometry-cross span {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: translate(-50%, -50%);
}

.geometry-cross span + span {
  transform: translate(-50%, -50%) rotate(90deg);
}

.interface-window {
  transform: translate3d(
      calc(var(--pointer-x) * -0.35),
      calc(var(--pointer-y) * -0.35),
      0
    )
    rotateY(-3deg) rotateX(2deg);
  transition: transform 350ms ease-out;
}

.floating-chip {
  animation: chip-float 7s ease-in-out infinite;
}

.chip-bottom {
  animation-delay: -3.5s;
}
    `}</style>
  );
}
