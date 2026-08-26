import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── 呆萌小狐狸：待机环视 + 轻微晃动 ──
export default function FoxModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/fox.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const survey = actions["Survey"];
    if (survey) {
      survey.reset();
      survey.fadeIn(0.6);
      survey.play();
    }
    return () => {
      actions["Survey"]?.fadeOut(0.3);
    };
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // 面向画面中心,带轻微左右摇摆
    group.current.rotation.y = -Math.PI / 2 + Math.sin(t * 0.4) * 0.15;
  });

  return (
    <group
      ref={group}
      position={[2.4, -2.2, 0.5]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={0.01}
    >
      <primitive object={scene} />
    </group>
  );
}