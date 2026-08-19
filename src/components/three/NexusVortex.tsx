import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import ArtisticCore from "./VortexCore";
import FloatingShapes from "./OrbitingShards";
import GentleParticles from "./ParticleStream";

// ── 相机微动：鼠标轻柔跟随 ──
function SceneCamera() {
  const { camera, mouse } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    (camera as THREE.PerspectiveCamera).position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_state, delta) => {
    target.current.x += (mouse.x * 0.5 - target.current.x) * delta * 1.8;
    target.current.y += (-mouse.y * 0.3 - target.current.y) * delta * 1.8;
    camera.position.x = target.current.x * 1.2;
    camera.position.y = target.current.y * 0.8;
    camera.lookAt(0, target.current.y * 0.1, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <SceneCamera />

      {/* 温暖柔光 */}
      <ambientLight intensity={0.8} color="#faf8f5" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff8f0" />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#f5ede8" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#c8a87c" distance={10} />

      <ArtisticCore />
      <FloatingShapes />
      <GentleParticles />

      <EffectComposer>
        <Vignette offset={0.15} darkness={0.3} />
      </EffectComposer>
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-cream">
      <div className="w-8 h-8 border-2 border-sage border-t-transparent rounded-full animate-spin opacity-60" />
    </div>
  );
}

export default function ArtScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 给 Canvas 足够时间初始化 WebGL 上下文
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const dpr = useRef<[number, number]>([1, 1.5]);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 4) dpr.current = [1, 1];
    else if (cores <= 8) dpr.current = [1, 1.5];
    else dpr.current = [1, 2];
  }, []);

  return (
    <>
      {!ready && <LoadingScreen />}
      <Canvas
        dpr={dpr.current}
        camera={{ position: [0, 0, 7], fov: 48, near: 0.1, far: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Scene />
      </Canvas>
    </>
  );
}
