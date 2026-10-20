"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Settings } from "@/components/default/playground/types";

export default function OrbitalStructure({ settings }: { settings: Settings }) {
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
