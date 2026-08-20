import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── 漂浮的文艺几何体：折纸感小多面体 ──
function FloatingGeo({
  position,
  size,
  color,
  rotationSpeed,
  floatOffset,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  rotationSpeed: number;
  floatOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += 0.003 * rotationSpeed;
    ref.current.rotation.y += 0.005 * rotationSpeed;
    ref.current.rotation.z += 0.002 * rotationSpeed;
    // 轻柔上下漂浮
    ref.current.position.y = initialY + Math.sin(t * 0.6 + floatOffset) * 0.2;
  });

  const geometry = useMemo(() => {
    const geos = [
      new THREE.TetrahedronGeometry(size, 0),
      new THREE.OctahedronGeometry(size, 0),
      new THREE.IcosahedronGeometry(size, 0),
      new THREE.DodecahedronGeometry(size, 0),
    ];
    return geos[Math.floor(Math.random() * geos.length)];
  }, [size]);

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.55}
        metalness={0.03}
        transparent
        opacity={0.82}
      />
    </mesh>
  );
}

// ── 细环带 ──
function DelicateRing({
  radius,
  rotation,
  color,
  speed,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.25;
      ref.current.rotation.y += delta * speed * 0.35;
    }
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} />
    </mesh>
  );
}

export default function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const items: {
      position: [number, number, number];
      size: number;
      color: string;
      rotationSpeed: number;
      floatOffset: number;
    }[] = [];
    const palette = [
      "#e8d5c4", // 米白
      "#dcc9bc", // 浅玫瑰
      "#c8a87c", // 琥珀
      "#a8c0a1", // 浅鼠尾草
      "#c4a595", // 陶土玫瑰
      "#d4c5b9", // 暖灰
      "#b8c9b0", // 灰绿
    ];

    for (let i = 0; i < 22; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.8;
      const radius = 2.0 + Math.random() * 2.2;

      items.push({
        position: [
          Math.cos(theta) * Math.cos(phi) * radius,
          Math.sin(phi) * radius * 0.7,
          Math.sin(theta) * Math.cos(phi) * radius,
        ],
        size: 0.1 + Math.random() * 0.22,
        color: palette[Math.floor(Math.random() * palette.length)],
        rotationSpeed: 0.3 + Math.random() * 1.2,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 细环 */}
      <DelicateRing radius={2.2} rotation={[0, 0, 0]} color="#c4a595" speed={0.6} />
      <DelicateRing radius={2.6} rotation={[Math.PI * 0.4, 0, 0]} color="#a8c0a1" speed={-0.5} />
      <DelicateRing radius={3.0} rotation={[0.15, Math.PI * 0.35, 0.1]} color="#c8a87c" speed={0.4} />

      {/* 漂浮几何体 */}
      {shapes.map((s, i) => (
        <FloatingGeo key={i} {...s} />
      ))}
    </group>
  );
}
