import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── 文艺核心：暖色调亚光几何体 + 细线框 ──
export default function ArtisticCore() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const matteMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8d5c4",
        roughness: 0.65,
        metalness: 0.02,
      }),
    [],
  );

  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#c4a595",
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.z = Math.cos(t * 0.25) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08;
      wireRef.current.rotation.x = Math.cos(t * 0.35) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 主体：亚光多面体 */}
      <mesh material={matteMaterial}>
        <icosahedronGeometry args={[1.1, 1]} />
      </mesh>

      {/* 外层线框 */}
      <mesh ref={wireRef} material={wireMaterial}>
        <icosahedronGeometry args={[1.35, 0]} />
      </mesh>

      {/* 中心小球 */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#c8a87c"
          roughness={0.5}
          metalness={0.05}
          emissive="#c8a87c"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
