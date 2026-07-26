import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import VortexCore from "./VortexCore";
import OrbitingShards from "./OrbitingShards";
import ParticleStream from "./ParticleStream";

// Scene camera controller — smooth mouse following
function SceneCamera() {
  const { camera, mouse } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Position camera looking down slightly at the vortex
    (camera as THREE.PerspectiveCamera).position.set(0, 0.5, 5.5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_state, delta) => {
    // Smooth mouse following
    target.current.x += (mouse.x * 0.6 - target.current.x) * delta * 2;
    target.current.y += (-mouse.y * 0.3 - target.current.y) * delta * 2;

    camera.position.x = target.current.x;
    camera.position.y = 0.5 + target.current.y;

    const radius = 5.5;
    const angle = target.current.x * 0.3;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;

    camera.lookAt(0, target.current.y * 0.2, 0);
  });

  return null;
}

// Inner scene content
function Scene() {
  return (
    <>
      <SceneCamera />

      {/* Ambient and point lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#22d3ee" distance={8} />

      {/* The vortex components */}
      <VortexCore />
      <OrbitingShards />
      <ParticleStream />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          radius={0.5}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

// Loading fallback
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
      <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Main exported component
export default function NexusVortex() {
  const [dpr, setDpr] = useState(1.5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Adaptive quality based on device
    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 4) setDpr(1);
    else if (cores <= 8) setDpr(1.5);
    else setDpr(2);

    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <LoadingScreen />
      <Canvas
        dpr={[1, dpr]}
        camera={{ position: [0, 0.5, 5.5], fov: 50, near: 0.1, far: 20 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
}
