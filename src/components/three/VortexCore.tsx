import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex shader for the energy core
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader — plasma glow with fresnel
const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    // Fresnel
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = 1.0 - abs(dot(vNormal, viewDir));
    fresnel = pow(fresnel, 2.5);

    // Plasma noise
    float n = noise(vUv * 8.0 + uTime * 0.3);
    float n2 = noise(vUv * 4.0 - uTime * 0.2);

    // Pulse
    float pulse = 1.0 + 0.15 * sin(uTime * 2.0) + 0.1 * sin(uTime * 3.7 + 1.5);

    // Colors
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    vec3 blue = vec3(0.23, 0.51, 0.96);
    vec3 deepBlue = vec3(0.06, 0.15, 0.50);

    vec3 color = mix(cyan, blue, n * 0.7 + 0.3);
    color = mix(color, deepBlue, fresnel * 0.6 + n2 * 0.2);

    // Bright spots
    float brightSpot = smoothstep(0.55, 0.7, n) * 0.4;
    color += cyan * brightSpot;

    // Edge glow
    color += cyan * fresnel * 0.6 * pulse;

    // Center core
    float centerGlow = 1.0 - length(vUv - 0.5) * 2.0;
    centerGlow = pow(max(centerGlow, 0.0), 3.0);
    color = mix(color, vec3(1.0), centerGlow * 0.3 * pulse);

    float alpha = 0.85 + fresnel * 0.15 + centerGlow * 0.15;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function VortexCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x += 0.0003;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.002;
      innerRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* Inner core glow */}
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
