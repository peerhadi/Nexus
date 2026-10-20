"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import AnimatedObject from "@/components/default/playground/animated-object";
import OrbitalStructure from "@/components/default/playground/orbital-structure";
import type { Settings } from "@/components/default/playground/types";

export default function Scene({ settings }: { settings: Settings }) {
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
