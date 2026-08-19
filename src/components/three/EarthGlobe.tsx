"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { TravelCity } from "../../data/profile";

// ============================================================
//  Earth texture URL (NASA Blue Marble 2048px)
// ============================================================
const EARTH_TEXTURE_URL =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

// ============================================================
//  坐标转换：经纬度 → 3D 球面坐标
// ============================================================
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);   // 极角：北极=0，赤道=π/2，南极=π
  const theta = THREE.MathUtils.degToRad(lng);       // 经度（弧度）
  // 对齐 Three.js SphereGeometry 的 UV 映射：
  //   纹理水平中心 (u=0.5) = 本初子午线 0° → 球体 +X 侧
  //   纹理 u=0.25 = 西经 90° → 球体 +Z 侧（正面）
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ============================================================
//  大气光晕
// ============================================================
function Atmosphere() {
  return (
    <>
      {/* 外层光晕 */}
      <Sphere args={[2.12, 64, 64]}>
        <meshBasicMaterial
          color="#4488cc"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* 内层 fresnel 光晕 */}
      <Sphere args={[2.05, 64, 64]}>
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          vertexShader={/* glsl */ `
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vec4 worldPos = modelMatrix * vec4(position, 1.0);
              vNormal = normalize(mat3(modelMatrix) * normal);
              vPosition = worldPos.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={/* glsl */ `
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vec3 viewDir = normalize(cameraPosition - vPosition);
              float fresnel = 1.0 - abs(dot(viewDir, vNormal));
              fresnel = pow(fresnel, 3.0);
              float alpha = fresnel * 0.12;
              gl_FragColor = vec4(0.35, 0.55, 0.9, alpha);
            }
          `}
        />
      </Sphere>
    </>
  );
}

// ============================================================
//  星空粒子背景
// ============================================================
function Stars() {
  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < 800; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 7 + Math.random() * 6;
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }
    return new Float32Array(pos);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#8899cc"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ============================================================
//  城市标记点
// ============================================================
const CITY_COLORS = [
  "#ffcc80",
  "#80cbc4",
  "#ef9a9a",
  "#a5d6a7",
  "#ffab40",
  "#90caf9",
];

function CityMarker({
  city,
  index,
  radius,
  onClick,
}: {
  city: TravelCity;
  index: number;
  radius: number;
  onClick: (city: TravelCity) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const ringGroupRef = useRef<THREE.Group>(null!);

  const position = useMemo(
    () => latLngToVec3(city.lat, city.lng, radius),
    [city.lat, city.lng, radius],
  );

  // 表面法线方向 = 从球心指向标记点
  const normal = useMemo(() => position.clone().normalize(), [position]);

  // 光环朝向：使环的 Z 轴对准表面法线（环面朝外）
  const ringQuaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  const color = CITY_COLORS[index % CITY_COLORS.length];

  // 所有子 mesh 共享的交互事件
  const handlers = useMemo(
    () => ({
      onClick: (e: any) => {
        e.stopPropagation();
        onClick(city);
      },
      onPointerOver: (e: any) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      },
      onPointerOut: () => {
        setHovered(false);
        document.body.style.cursor = "auto";
      },
    }),
    [onClick, city],
  );

  useFrame((_, delta) => {
    const tScale = hovered ? 2.2 : 1.0;
    const tOpacity = hovered ? 0.5 : 0.2;

    if (ringRef.current) {
      ringRef.current.scale.setScalar(
        THREE.MathUtils.lerp(ringRef.current.scale.x, tScale, 5 * delta),
      );
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(
          (ringRef.current.material as THREE.MeshBasicMaterial).opacity,
          tOpacity,
          5 * delta,
        );
    }
    if (markerRef.current) {
      markerRef.current.scale.setScalar(
        THREE.MathUtils.lerp(markerRef.current.scale.x, hovered ? 2.0 : 1.0, 5 * delta),
      );
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(
        THREE.MathUtils.lerp(glowRef.current.scale.x, hovered ? 3.0 : 1.0, 5 * delta),
      );
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity,
          hovered ? 0.5 : 0.3,
          5 * delta,
        );
    }
  });

  return (
    <group>
      {/* 大号隐形点击区域 — 保证 hover / click 可靠触发 */}
      <mesh position={position} {...handlers} visible={false}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthTest={false} />
      </mesh>

      {/* 外层光晕 */}
      <mesh ref={glowRef} position={position} {...handlers}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 脉冲光环 — 始终面朝表面法线方向 */}
      <group ref={ringGroupRef} position={position} quaternion={ringQuaternion}>
        <mesh ref={ringRef} {...handlers}>
          <ringGeometry args={[0.06, 0.12, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 定位点 */}
      <mesh ref={markerRef} position={position} {...handlers}>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* 光柱线 */}
      <mesh position={position} {...handlers}>
        <cylinderGeometry args={[0.008, 0.008, 0.22, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 悬停标签 — Html 投射到屏幕空间，固定大小，始终面向用户 */}
      <Html
        position={[position.x * 1.16, position.y * 1.16, position.z * 1.16]}
        center
        occlude={false}
        style={{
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transform: `scale(${hovered ? 1 : 0.5})`,
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div
          style={{
            background: "rgba(10, 12, 18, 0.92)",
            color: "#e8e4dd",
            padding: "6px 16px",
            borderRadius: "9999px",
            fontSize: "13px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            fontFamily: "Inter, PingFang SC, Microsoft YaHei, sans-serif",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {city.emoji} {city.city}
        </div>
      </Html>
    </group>
  );
}

// ============================================================
//  地球主体
// ============================================================
function Earth({
  cities,
  onCityClick,
}: {
  cities: TravelCity[];
  onCityClick: (city: TravelCity) => void;
}) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(EARTH_TEXTURE_URL);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  return (
    <group>
      {/* 地球球体 — 自发光材质，无暗面 */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 大气光晕 */}
      <Atmosphere />

      {/* 城市标记 */}
      {cities.map((city, i) => (
        <CityMarker
          key={city.city}
          city={city}
          index={i}
          radius={2}
          onClick={onCityClick}
        />
      ))}
    </group>
  );
}

// ============================================================
//  加载占位
// ============================================================
function LoadingPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#0d1b2a" roughness={1} />
    </mesh>
  );
}

// ============================================================
//  场景配置
// ============================================================
function Scene({
  cities,
  onCityClick,
}: {
  cities: TravelCity[];
  onCityClick: (city: TravelCity) => void;
}) {
  return (
    <>
      {/* 灯光 */}
      <ambientLight intensity={0.25} color="#8899cc" />
      <directionalLight
        position={[5, 3, 5]}
        intensity={1.6}
        color="#ffffff"
      />
      <directionalLight
        position={[-3, -1, -3]}
        intensity={0.2}
        color="#4488cc"
      />

      <Stars />

      <Suspense fallback={<LoadingPlaceholder />}>
        <Earth cities={cities} onCityClick={onCityClick} />
      </Suspense>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3.0}
        maxDistance={6}
        autoRotate={false}
        dampingFactor={0.08}
      />
    </>
  );
}

// ============================================================
//  导出组件
// ============================================================
interface EarthGlobeProps {
  cities: TravelCity[];
  onCityClick: (city: TravelCity) => void;
}

export default function EarthGlobe({ cities, onCityClick }: EarthGlobeProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene cities={cities} onCityClick={onCityClick} />
      </Canvas>
    </div>
  );
}
