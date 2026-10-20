"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeGeometry } from "@/components/default/playground/make-geometry";
import type { Settings } from "@/components/default/playground/types";

export default function AnimatedObject({ settings }: { settings: Settings }) {
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
