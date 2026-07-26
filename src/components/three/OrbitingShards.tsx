import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitingShardsProps {
  count?: number;
  radius?: number;
  speed?: number;
  axis?: "xy" | "xz" | "yz";
  color?: string;
}

function TorusRing({ radius, speed, rotation, color }: {
  radius: number;
  speed: number;
  rotation: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.5;
      ref.current.rotation.y += delta * speed * 0.3;
      ref.current.rotation.z += delta * speed * 0.2;
    }
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.015, 8, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function FloatingShard({ position, size, color }: {
  position: [number, number, number];
  size: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[size * 0.3, size, 3, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.6}
        roughness={0.3}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function OrbitingShards() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    const items: { position: [number, number, number]; size: number; color: string }[] = [];
    const colors = ["#22d3ee", "#3b82f6", "#a855f7", "#06b6d4", "#6366f1"];

    for (let i = 0; i < 25; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.5;

      items.push({
        position: [
          Math.cos(theta) * Math.cos(phi) * radius,
          Math.sin(phi) * radius * 0.6,
          Math.sin(theta) * Math.cos(phi) * radius,
        ],
        size: 0.06 + Math.random() * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Three orbiting angular rings */}
      <TorusRing radius={1.8} speed={0.8} rotation={[0, 0, 0]} color="#22d3ee" />
      <TorusRing radius={2.1} speed={-0.6} rotation={[Math.PI * 0.45, 0, 0]} color="#3b82f6" />
      <TorusRing radius={2.4} speed={0.9} rotation={[Math.PI * 0.25, Math.PI * 0.3, 0]} color="#06b6d4" />

      {/* Outer ring */}
      <TorusRing radius={2.8} speed={-0.4} rotation={[Math.PI * 0.3, Math.PI * 0.5, Math.PI * 0.15]} color="#6366f1" />

      {/* Floating shards */}
      {shards.map((s, i) => (
        <FloatingShard key={i} {...s} />
      ))}
    </group>
  );
}
