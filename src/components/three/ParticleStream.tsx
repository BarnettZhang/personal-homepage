import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleStream() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const cyan = new THREE.Color("#22d3ee");
    const blue = new THREE.Color("#3b82f6");
    const white = new THREE.Color("#ffffff");
    const purple = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i++) {
      // Spiral distribution
      const t = (i / count) * 5 * Math.PI; // spiral angle
      const radius = 1.5 + (i / count) * 2.5; // expanding outward
      const height = (Math.random() - 0.5) * 0.8;

      // Create spiral arms
      const armCount = 3;
      const armIndex = i % armCount;
      const armAngle = (armIndex / armCount) * Math.PI * 2;

      const angle = t + armAngle + (Math.random() - 0.5) * 0.4;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height * (1 - i / count) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color gradient: white/cyan near center → blue/purple at edges
      const dist = radius / 4.0; // 0 at center, ~1 at edge
      let color: THREE.Color;
      if (dist < 0.3) {
        color = white.clone().lerp(cyan, dist / 0.3);
      } else if (dist < 0.6) {
        color = cyan.clone().lerp(blue, (dist - 0.3) / 0.3);
      } else {
        color = blue.clone().lerp(purple, (dist - 0.6) / 0.4);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size: larger near center, smaller at edges
      sizes[i] = (1 - dist * 0.7) * 0.04 + Math.random() * 0.02;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const sizeArr = pointsRef.current.geometry.attributes.size?.array as Float32Array;

    for (let i = 0; i < pos.length / 3; i++) {
      const x = pos[i * 3];
      const z = pos[i * 3 + 2];
      const radius = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      // Rotate particles around Y axis, faster near center
      const speed = 0.3 * (1 - radius / 4.0) + 0.1;
      const newAngle = angle + delta * speed;

      pos[i * 3] = Math.cos(newAngle) * radius;
      pos[i * 3 + 2] = Math.sin(newAngle) * radius;

      // Pulse size
      if (sizeArr) {
        const pulse = 1 + 0.3 * Math.sin(radius * 2 - delta * 5);
        sizeArr[i] = sizes[i] * pulse;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    if (pointsRef.current.geometry.attributes.size) {
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
    }

    // Slowly rotate entire system
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
