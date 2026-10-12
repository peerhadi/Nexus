"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Aperture,
  ArrowDownRight,
  Check,
  ChevronRight,
  Download,
  Eye,
  Lightbulb,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles as SparkleIcon,
  WandSparkles,
} from "lucide-react";

type Shape =
  "Prism" | "Crystal" | "Torus Knot" | "Helix" | "Dodecahedron" | "Torus";

type Finish = "Holographic" | "Chrome" | "Glass" | "Neon";

type Settings = {
  shape: Shape;
  finish: Finish;
  color: string;
  accent: string;
  glow: number;
  metalness: number;
  rotation: boolean;
  particles: boolean;
  orbits: boolean;
  background: string;
};

const INITIAL: Settings = {
  shape: "Prism",
  finish: "Holographic",
  color: "#70E7FF",
  accent: "#9A7BFF",
  glow: 1.15,
  metalness: 0.85,
  rotation: true,
  particles: true,
  orbits: true,
  background: "#F7F9FC",
};

const SHAPES: Shape[] = [
  "Prism",
  "Crystal",
  "Torus Knot",
  "Helix",
  "Dodecahedron",
  "Torus",
];

const FINISHES: Finish[] = ["Holographic", "Chrome", "Glass", "Neon"];

const PALETTES = [
  { name: "Arctic", a: "#70E7FF", b: "#9A7BFF" },
  { name: "Ultraviolet", a: "#B38AFF", b: "#FF79C8" },
  { name: "Solar flare", a: "#FFBB70", b: "#FF6584" },
  { name: "Electric", a: "#65F2C1", b: "#56A7FF" },
  { name: "Cyber", a: "#E1FF70", b: "#70E7FF" },
  { name: "Rose gold", a: "#FFA7AE", b: "#D7B2FF" },
];

const BACKGROUNDS = [
  "#F7F9FC",
  "#EDF5FF",
  "#F3EEFF",
  "#FFF1EC",
  "#EAF8F2",
  "#FFFFFF",
  "#171A25",
];

function makeGeometry(shape: Shape): THREE.BufferGeometry {
  switch (shape) {
    case "Prism":
      return new THREE.OctahedronGeometry(1.18, 0);
    case "Crystal":
      return new THREE.IcosahedronGeometry(1.12, 1);
    case "Torus Knot":
      return new THREE.TorusKnotGeometry(0.76, 0.24, 240, 32, 2, 3);
    case "Helix":
      return new THREE.TorusKnotGeometry(0.72, 0.18, 240, 24, 3, 5);
    case "Dodecahedron":
      return new THREE.DodecahedronGeometry(1.12, 0);
    case "Torus":
      return new THREE.TorusGeometry(0.86, 0.27, 32, 120);
  }
}

function readCssVariable(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value || fallback;
}

function AnimatedObject({ settings }: { settings: Settings }) {
  const group = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(
    () => makeGeometry(settings.shape),
    [settings.shape],
  );

  const wireGeometry = useMemo(
    () => makeGeometry(settings.shape),
    [settings.shape],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      wireGeometry.dispose();
    };
  }, [geometry, wireGeometry]);

  const materialSettings = useMemo(() => {
    switch (settings.finish) {
      case "Glass":
        return {
          metalness: 0.08,
          roughness: 0.04,
          transmission: 0.9,
          thickness: 1.2,
          ior: 1.5,
          emissiveIntensity: 0.12,
          clearcoat: 1,
        };

      case "Chrome":
        return {
          metalness: 1,
          roughness: 0.09,
          transmission: 0,
          thickness: 0,
          ior: 1.5,
          emissiveIntensity: 0.18,
          clearcoat: 1,
        };

      case "Neon":
        return {
          metalness: 0.35,
          roughness: 0.24,
          transmission: 0,
          thickness: 0,
          ior: 1.5,
          emissiveIntensity: 1.5,
          clearcoat: 0.6,
        };

      default:
        return {
          metalness: settings.metalness,
          roughness: 0.13,
          transmission: 0,
          thickness: 0.4,
          ior: 1.5,
          emissiveIntensity: 0.32,
          clearcoat: 1,
        };
    }
  }, [settings.finish, settings.metalness]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (settings.rotation) {
      group.current.rotation.y += delta * 0.34;
      group.current.rotation.x += delta * 0.11;
      group.current.rotation.z += delta * 0.07;
    }

    if (materialRef.current) {
      const hue = state.clock.elapsedTime * 0.045;
      materialRef.current.iridescence =
        settings.finish === "Holographic" ? 0.85 + Math.sin(hue * 2) * 0.12 : 0;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          ref={materialRef}
          color={settings.color}
          emissive={settings.color}
          emissiveIntensity={materialSettings.emissiveIntensity}
          metalness={materialSettings.metalness}
          roughness={materialSettings.roughness}
          transmission={materialSettings.transmission}
          thickness={materialSettings.thickness}
          ior={materialSettings.ior}
          clearcoat={materialSettings.clearcoat}
          clearcoatRoughness={0.08}
          iridescence={settings.finish === "Holographic" ? 1 : 0}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[100, 700]}
          envMapIntensity={2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fine luminous edges give the object its engineered look. */}
      <mesh geometry={wireGeometry} scale={1.008}>
        <meshBasicMaterial
          color={settings.accent}
          wireframe
          transparent
          opacity={settings.finish === "Neon" ? 0.65 : 0.2}
        />
      </mesh>

      {/* A second, offset silhouette adds depth to the sculpture. */}
      <mesh geometry={wireGeometry} scale={1.035} rotation={[0.1, 0.18, 0.06]}>
        <meshBasicMaterial
          color={settings.color}
          wireframe
          transparent
          opacity={0.075}
        />
      </mesh>
    </group>
  );
}

function OrbitalStructure({ settings }: { settings: Settings }) {
  const group = useRef<THREE.Group>(null);

  const rings = useMemo(
    () => [
      { radius: 1.65, tube: 0.009, x: 0.3, y: 0.1, z: 0.65 },
      { radius: 1.92, tube: 0.006, x: 1.0, y: 0.4, z: -0.2 },
      { radius: 2.12, tube: 0.004, x: 1.35, y: 0.05, z: 0.3 },
    ],
    [],
  );

  useFrame((_, delta) => {
    if (!group.current || !settings.rotation) return;

    group.current.rotation.y += delta * 0.1;
    group.current.rotation.z -= delta * 0.045;
  });

  if (!settings.orbits) return null;

  return (
    <group ref={group}>
      {rings.map((ring, index) => (
        <mesh key={index} rotation={[ring.x, ring.y, ring.z]}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 220]} />
          <meshBasicMaterial
            color={index === 1 ? settings.accent : settings.color}
            transparent
            opacity={index === 1 ? 0.78 : 0.4}
          />
        </mesh>
      ))}

      {/* Orbiting markers are deliberately angular, not decorative bubbles. */}
      {[
        { angle: 0.55, radius: 1.92, color: settings.accent },
        { angle: 3.0, radius: 1.65, color: settings.color },
        { angle: 4.7, radius: 2.12, color: settings.accent },
      ].map((point, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(point.angle) * point.radius,
            Math.sin(point.angle) * 0.55,
            Math.sin(point.angle) * point.radius,
          ]}
          scale={index === 1 ? 0.075 : 0.045}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={point.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ settings }: { settings: Settings }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(settings.background, 1);
  }, [gl, settings.background]);

  return (
    <>
      <color attach="background" args={[settings.background]} />

      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={3.2} color="#FFFFFF" />
      <pointLight
        position={[-3, 1.5, 2]}
        intensity={45}
        distance={9}
        color={settings.color}
      />
      <pointLight
        position={[3, -2, -3]}
        intensity={40}
        distance={9}
        color={settings.accent}
      />
      <spotLight
        position={[0, 4, 3]}
        intensity={30}
        angle={0.6}
        penumbra={1}
        color="#FFFFFF"
      />

      <Environment preset="studio" />

      <Float
        speed={settings.rotation ? 1.2 : 0}
        floatIntensity={settings.rotation ? 0.23 : 0}
        rotationIntensity={settings.rotation ? 0.12 : 0}
      >
        <AnimatedObject settings={settings} />
      </Float>

      <OrbitalStructure settings={settings} />

      {settings.particles && (
        <>
          <Sparkles
            count={90}
            scale={6}
            size={2.2}
            speed={0.24}
            opacity={0.7}
            color={settings.color}
          />
          <Sparkles
            count={36}
            scale={4}
            size={3}
            speed={0.45}
            opacity={0.55}
            color={settings.accent}
          />
        </>
      )}

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.055}
        minDistance={3.3}
        maxDistance={8}
      />

      <EffectComposer>
        <Bloom
          intensity={settings.glow}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

function SectionLabel({
  index,
  title,
  detail,
}: {
  index: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] font-semibold text-[var(--accent)]">
          {index}
        </span>
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {title}
        </h3>
      </div>
      {detail && (
        <span className="text-[10px] text-[var(--text-secondary)]">
          {detail}
        </span>
      )}
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
        {label}
        <span className="font-mono text-[var(--text-primary)]">
          {value.toFixed(2)}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="playground-range w-full"
      />
    </label>
  );
}

function ColourControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  function updateDraft(next: string) {
    setDraft(next);
    if (/^#[0-9a-fA-F]{6}$/.test(next)) {
      onChange(next.toUpperCase());
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <input
        type="color"
        aria-label={label}
        value={value}
        onChange={(event) => {
          setDraft(event.target.value.toUpperCase());
          onChange(event.target.value.toUpperCase());
        }}
        className="playground-color h-10 w-12 shrink-0 cursor-pointer"
      />
      <div className="min-w-0 flex-1">
        <label className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          {label}
        </label>
        <input
          value={draft}
          maxLength={7}
          spellCheck={false}
          onChange={(event) => updateDraft(event.target.value)}
          className="w-full bg-transparent font-mono text-sm uppercase text-[var(--text-primary)] outline-none"
        />
      </div>
    </div>
  );
}

function Toggle({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      className="flex w-full items-center justify-between py-2 text-left"
    >
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          enabled ? "bg-[var(--accent)]" : "bg-black/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function PlaygroundPage() {
  const [settings, setSettings] = useState<Settings>(INITIAL);
  const [tab, setTab] = useState<"Form" | "Surface" | "Atmosphere">("Form");
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setSettings((current) => ({
      ...current,
      background: readCssVariable("--background", INITIAL.background),
    }));
  }, []);

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const randomize = useCallback(() => {
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const finish = FINISHES[Math.floor(Math.random() * FINISHES.length)];

    setSettings((current) => ({
      ...current,
      shape,
      finish,
      color: palette.a,
      accent: palette.b,
      glow: 0.55 + Math.random() * 1.15,
      metalness: Math.random(),
      rotation: true,
      particles: true,
      orbits: true,
    }));
    setNotice("New composition generated");
  }, []);

  const exportImage = useCallback(() => {
    if (!canvasElement) {
      setNotice("The 3D scene is still loading");
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = `nexus-playground-${Date.now()}.png`;
      link.href = canvasElement.toDataURL("image/png");
      link.click();
      setNotice("Your creation has been exported");
    } catch {
      setNotice("Export failed. Try again after the scene loads");
    }
  }, [canvasElement]);

  const reset = useCallback(() => {
    setSettings({
      ...INITIAL,
      background: readCssVariable("--background", INITIAL.background),
    });
    setNotice("Composition reset");
  }, []);

  return (
    <main className="playground-page min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
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

      {/* Editorial header */}
      <header className="relative px-5 pb-8 pt-16 sm:px-8 sm:pb-12 sm:pt-24 lg:px-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-20 -top-32 h-[430px] w-[650px] rounded-full opacity-20 blur-[110px]"
            style={{ background: "var(--gradient-primary)" }}
          />
        </div>

        <div className="relative mx-auto max-w-[1500px]">
          <div className="playground-enter mb-8 flex items-center gap-3 mt-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-primary)]">
                NEXUS PLAYGROUND
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Interactive digital sculpture studio
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="playground-enter max-w-4xl">
              <h1 className="text-5xl font-bold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[100px]">
                Make something
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  extraordinary.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                Sculpt with light. Bend colour. Explore impossible forms. A
                little corner of the internet where you make the rules.
              </p>
            </div>

            <div className="playground-enter-delay flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 border border-[var(--pg-line)] bg-[var(--pg-muted)] px-4 py-3 text-xs text-[var(--text-secondary)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Real Time 3D
              </span>
              <button
                type="button"
                onClick={randomize}
                className="flex items-center gap-2 px-4 py-3 text-xs font-semibold text-white transition hover:brightness-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                <WandSparkles size={15} />
                Surprise me
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Studio workspace */}
      <section className="px-3 pb-16 sm:px-6 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main stage */}
            <div
              className={`playground-enter min-w-0 overflow-hidden border border-[var(--pg-line)] bg-[var(--background)] ${
                isFullscreen
                  ? "fixed inset-3 z-50 flex flex-col shadow-2xl sm:inset-6"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--pg-line)] px-4 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <Aperture size={18} className="text-[var(--accent)]" />
                  <div>
                    <p className="text-xs font-bold tracking-wide">
                      THE OBJECT STUDIO
                    </p>
                    <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                      Drag to rotate · Scroll to zoom
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] text-[var(--text-secondary)] sm:block">
                    NX / 001
                  </span>
                  <button
                    type="button"
                    title="Toggle fullscreen"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="border border-[var(--pg-line)] p-2.5 transition hover:bg-[var(--pg-muted)]"
                  >
                    {isFullscreen ? (
                      <ChevronRight size={15} className="rotate-180" />
                    ) : (
                      <Maximize2 size={15} />
                    )}
                  </button>
                  {isFullscreen && (
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(false)}
                      className="border border-[var(--pg-line)] p-2.5 hover:bg-[var(--pg-muted)]"
                    >
                      <ArrowDownRight size={15} />
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`relative min-h-[420px] flex-1 overflow-hidden sm:min-h-[560px] ${
                  isFullscreen ? "min-h-0" : ""
                }`}
                style={{ backgroundColor: settings.background }}
              >
                <div className="playground-grid pointer-events-none absolute inset-0 opacity-70" />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[85px] sm:h-[480px] sm:w-[480px]"
                  style={{
                    background: `radial-gradient(circle, ${settings.color} 0%, ${settings.accent} 35%, transparent 72%)`,
                  }}
                />

                <Canvas
                  dpr={[1, 1.75]}
                  camera={{ position: [0, 0, 5.2], fov: 42 }}
                  gl={{
                    antialias: true,
                    alpha: false,
                    preserveDrawingBuffer: true,
                    powerPreference: "high-performance",
                  }}
                  onCreated={({ gl }) => setCanvasElement(gl.domElement)}
                  className="h-[550px]!"
                >
                  <Suspense fallback={null}>
                    <Scene settings={settings} />
                  </Suspense>
                </Canvas>

                <div className="pointer-events-none absolute left-5 top-5 sm:left-7 sm:top-7">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-secondary)]">
                    FORM /{" "}
                    {String(SHAPES.indexOf(settings.shape) + 1).padStart(
                      2,
                      "0",
                    )}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight">
                    {settings.shape}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {settings.finish} finish
                  </p>
                </div>

                <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 sm:bottom-7 sm:left-7">
                  <span
                    className="h-3 w-3"
                    style={{ backgroundColor: settings.color }}
                  />
                  <span
                    className="h-3 w-3"
                    style={{ backgroundColor: settings.accent }}
                  />
                  <span className="ml-1 font-mono text-[10px] text-[var(--text-secondary)]">
                    {settings.color} / {settings.accent}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={exportImage}
                  className="absolute bottom-5 right-5 flex items-center gap-2 border border-[var(--pg-line)] bg-[var(--background)]/85 px-4 py-3 text-xs font-semibold backdrop-blur-md transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
                >
                  <Download size={14} />
                  Export artwork
                </button>
              </div>

              {/* Palette strip */}
              <div className="border-t border-[var(--pg-line)] px-4 py-4 sm:px-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SparkleIcon size={14} className="text-[var(--accent)]" />
                    <span className="text-xs font-semibold">
                      Colour stories
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)]">
                    SELECT A PALETTE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {PALETTES.map((palette) => {
                    const active = settings.color === palette.a;

                    return (
                      <button
                        key={palette.name}
                        type="button"
                        onClick={() => {
                          update("color", palette.a);
                          update("accent", palette.b);
                        }}
                        className={`group min-w-0 border p-2 text-left transition ${
                          active
                            ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                            : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                        }`}
                      >
                        <span className="mb-2 flex h-8 overflow-hidden">
                          <span
                            className="h-full w-1/2 transition-transform group-hover:scale-110"
                            style={{ background: palette.a }}
                          />
                          <span
                            className="h-full w-1/2 transition-transform group-hover:scale-110"
                            style={{ background: palette.b }}
                          />
                        </span>
                        <span className="flex items-center justify-between gap-1 text-[10px] font-medium">
                          <span className="truncate">{palette.name}</span>
                          {active && (
                            <Check
                              size={12}
                              className="shrink-0 text-[var(--accent)]"
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Custom inspector */}
            <aside className="playground-enter-delay h-fit min-w-0 border border-[var(--pg-line)] bg-[var(--background)]">
              <div className="flex items-center justify-between border-b border-[var(--pg-line)] px-5 py-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em]">
                    Inspector
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                    Tune every detail
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                  01—03
                </span>
              </div>

              <div className="grid grid-cols-3 border-b border-[var(--pg-line)]">
                {(
                  [
                    { name: "Form", number: "01" },
                    { name: "Surface", number: "02" },
                    { name: "Atmosphere", number: "03" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTab(item.name)}
                    className={`border-b-2 px-1 py-3 text-[10px] font-semibold transition ${
                      tab === item.name
                        ? "border-[var(--accent)] text-[var(--text-primary)]"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="mb-1 block font-mono opacity-60">
                      {item.number}
                    </span>
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="space-y-6 p-5">
                {tab === "Form" && (
                  <>
                    <div>
                      <SectionLabel
                        index="01"
                        title="Choose your geometry"
                        detail="6 FORMS"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        {SHAPES.map((shape, index) => {
                          const active = settings.shape === shape;

                          return (
                            <button
                              key={shape}
                              type="button"
                              onClick={() => update("shape", shape)}
                              className={`group relative overflow-hidden border p-3 text-left transition ${
                                active
                                  ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                                  : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                              }`}
                            >
                              <span
                                className="pointer-events-none absolute -right-4 -top-5 h-16 w-16 opacity-25 blur-2xl transition group-hover:opacity-70"
                                style={{
                                  background:
                                    index % 2
                                      ? settings.accent
                                      : settings.color,
                                }}
                              />
                              <span className="relative mb-3 flex h-9 items-center justify-between">
                                <span
                                  className="block h-7 w-7 border"
                                  style={{
                                    borderColor: active
                                      ? settings.color
                                      : "var(--pg-line)",
                                    background: active ? `cyan` : "white",
                                    transform: `rotate(${index * 13}deg)`,
                                    clipPath: [
                                      "polygon(50% 0,100% 50%,50% 100%,0 50%)",
                                      "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                                      "polygon(50% 0,100% 30%,80% 100%,20% 100%,0 30%)",
                                      "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                                      "polygon(50% 0,100% 35%,80% 100%,20% 100%,0 35%)",
                                      "polygon(0 20%,80% 0,100% 80%,20% 100%)",
                                    ][index],
                                  }}
                                />
                                {active && (
                                  <Check
                                    size={14}
                                    className="text-[var(--accent)]"
                                  />
                                )}
                              </span>
                              <span className="relative block text-[11px] font-semibold">
                                {shape}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-[var(--pg-line)] pt-5">
                      <SectionLabel index="02" title="Object colours" />
                      <div className="space-y-4">
                        <ColourControl
                          label="Primary"
                          value={settings.color}
                          onChange={(value) => update("color", value)}
                        />
                        <ColourControl
                          label="Accent"
                          value={settings.accent}
                          onChange={(value) => update("accent", value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {tab === "Surface" && (
                  <>
                    <div>
                      <SectionLabel index="01" title="Surface finish" />
                      <div className="space-y-2">
                        {FINISHES.map((finish, index) => {
                          const active = settings.finish === finish;

                          return (
                            <button
                              key={finish}
                              type="button"
                              onClick={() => update("finish", finish)}
                              className={`flex w-full items-center gap-3 border p-3 text-left transition ${
                                active
                                  ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                                  : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                              }`}
                            >
                              <span
                                className="h-10 w-10 shrink-0"
                                style={{
                                  background: [
                                    `linear-gradient(135deg, ${settings.color}, ${settings.accent}, #FFFFFF, ${settings.color})`,
                                    `linear-gradient(135deg, #FFFFFF, ${settings.color}, #8494AB)`,
                                    `linear-gradient(135deg, #FFFFFF88, ${settings.color}66, ${settings.accent}AA)`,
                                    `linear-gradient(135deg, ${settings.color}, ${settings.accent})`,
                                  ][index],
                                  border: "1px solid var(--pg-line)",
                                  clipPath:
                                    "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)",
                                }}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold">
                                  {finish}
                                </span>
                                <span className="mt-1 block text-[10px] text-[var(--text-secondary)]">
                                  {
                                    [
                                      "Iridescent spectral reflections",
                                      "Polished metallic surfaces",
                                      "Transparent crystal finish",
                                      "Self-illuminating colour",
                                    ][index]
                                  }
                                </span>
                              </span>
                              {active && (
                                <Check
                                  size={14}
                                  className="shrink-0 text-[var(--accent)]"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-5 border-t border-[var(--pg-line)] pt-5">
                      <SectionLabel index="02" title="Material properties" />
                      <RangeControl
                        label="Metalness"
                        value={settings.metalness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(value) => update("metalness", value)}
                      />
                      <p className="text-[10px] leading-5 text-[var(--text-secondary)]">
                        Metalness is most visible on Chrome and Holographic
                        finishes.
                      </p>
                    </div>
                  </>
                )}

                {tab === "Atmosphere" && (
                  <>
                    <div>
                      <SectionLabel index="01" title="Light and glow" />
                      <RangeControl
                        label="Bloom intensity"
                        value={settings.glow}
                        min={0}
                        max={2}
                        step={0.05}
                        onChange={(value) => update("glow", value)}
                      />
                      <div className="mt-4 flex items-center gap-2">
                        {[0.25, 0.65, 1.15, 1.65].map((glow) => (
                          <button
                            key={glow}
                            type="button"
                            onClick={() => update("glow", glow)}
                            className={`flex-1 border py-2 text-[10px] transition ${
                              Math.abs(settings.glow - glow) < 0.02
                                ? "border-[var(--accent)] bg-[var(--pg-muted)]"
                                : "border-[var(--pg-line)] hover:border-[var(--accent)]"
                            }`}
                          >
                            {glow < 0.5
                              ? "Soft"
                              : glow < 1
                                ? "Medium"
                                : glow < 1.5
                                  ? "Bright"
                                  : "Intense"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[var(--pg-line)] pt-5">
                      <SectionLabel index="02" title="Environment" />
                      <p className="mb-3 text-[10px] text-[var(--text-secondary)]">
                        Choose the canvas behind your sculpture.
                      </p>
                      <div className="grid grid-cols-7 gap-1.5">
                        {BACKGROUNDS.map((background) => (
                          <button
                            key={background}
                            type="button"
                            aria-label={`Background ${background}`}
                            onClick={() => update("background", background)}
                            className="flex aspect-square items-center justify-center border transition hover:scale-105"
                            style={{
                              backgroundColor: background,
                              borderColor:
                                settings.background === background
                                  ? "var(--accent)"
                                  : "var(--pg-line)",
                              outline:
                                settings.background === background
                                  ? "1px solid var(--accent)"
                                  : "none",
                              outlineOffset: 2,
                            }}
                          >
                            {settings.background === background && (
                              <Check
                                size={12}
                                color={
                                  background === "#171A25"
                                    ? "#FFFFFF"
                                    : "#252A36"
                                }
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[var(--pg-line)] pt-4">
                      <SectionLabel index="03" title="Scene effects" />
                      <Toggle
                        label="Object rotation"
                        enabled={settings.rotation}
                        onChange={(value) => update("rotation", value)}
                      />
                      <Toggle
                        label="Orbital structures"
                        enabled={settings.orbits}
                        onChange={(value) => update("orbits", value)}
                      />
                      <Toggle
                        label="Particle field"
                        enabled={settings.particles}
                        onChange={(value) => update("particles", value)}
                      />
                    </div>
                  </>
                )}

                <div className="border-t border-[var(--pg-line)] pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb size={15} className="text-[var(--accent)]" />
                    <span className="text-xs font-semibold">
                      Creative controls
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={randomize}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-xs font-semibold text-white transition hover:brightness-110"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <span className="flex items-center gap-2">
                      <Shuffle size={14} />
                      Generate new composition
                    </span>
                    <ChevronRight size={15} />
                  </button>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="flex items-center justify-center gap-2 border border-[var(--pg-line)] px-3 py-3 text-[11px] font-semibold transition hover:bg-[var(--pg-muted)]"
                    >
                      <RotateCcw size={13} />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={exportImage}
                      className="flex items-center justify-center gap-2 border border-[var(--pg-line)] px-3 py-3 text-[11px] font-semibold transition hover:bg-[var(--pg-muted)]"
                    >
                      <Download size={13} />
                      Export PNG
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom detail strip */}
          <div className="mt-4 grid gap-px border border-[var(--pg-line)] bg-[var(--pg-line)] sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "Sculpt",
                description: "Choose a form and build your silhouette.",
              },
              {
                number: "02",
                title: "Illuminate",
                description: "Dial in colour, materials, and light.",
              },
              {
                number: "03",
                title: "Make it yours",
                description: "Experiment freely and export your creation.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="flex gap-4 bg-[var(--background)] p-5 sm:p-6"
              >
                <span className="font-mono text-xs text-[var(--accent)]">
                  {item.number}
                </span>
                <div>
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 border border-[var(--pg-line)] bg-[var(--background)] px-4 py-3 text-xs font-medium shadow-xl"
        >
          <Check size={15} className="text-[var(--accent)]" />
          {notice}
          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
