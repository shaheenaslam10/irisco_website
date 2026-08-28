"use client";

/**
 * The fallback cup: a real lathed solid, built because there was no model of
 * the IRISCO cup in the repo.
 *
 * The profile travels up the outside, over the rim lip, then back down the
 * inside wall — so the lathe produces a hollow vessel with genuine thickness
 * rather than a solid lump. This is how a thrown cup is actually made.
 *
 * Superseded by `ModelCup` as soon as a real GLB is dropped in.
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { brand } from "@/lib/brand";
import { applyCupMotion, studioEnvironment } from "./parts";
import { scrollState } from "../motion/scrollState";

const CUP_PROFILE: Array<[number, number]> = [
  [0.0, 0.0],
  [0.26, 0.0],
  [0.3, 0.015],
  [0.315, 0.05],
  [0.3, 0.115], // foot
  [0.33, 0.2],
  [0.39, 0.45],
  [0.46, 0.75],
  [0.52, 1.0],
  [0.545, 1.09], // rim, outer
  [0.525, 1.105], // rim lip
  [0.5, 1.09], // rim, inner
  [0.47, 0.95],
  [0.42, 0.7],
  [0.36, 0.42],
  [0.31, 0.22],
  [0.28, 0.12], // inner floor
  [0.0, 0.1],
];

export function ProceduralCup({ intro }: { intro: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Mesh>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const rim = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const pts = CUP_PROFILE.map(([x, y]) => new THREE.Vector2(x, y));
    const g = new THREE.LatheGeometry(pts, 128);
    g.computeVertexNormals();
    return g;
  }, []);

  const env = useMemo(() => studioEnvironment(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = intro.current;

    if (group.current) {
      applyCupMotion(group.current, t, p, scrollState.hero);
    }

    if (lid.current) {
      const lift = p * 1.5;
      lid.current.position.y = 1.14 + lift;
      lid.current.rotation.z = p * 0.5;
      lid.current.rotation.x = p * 0.22;
      const m = lid.current.material as THREE.MeshPhysicalMaterial;
      m.opacity = Math.max(0, 1 - p * 1.35);
      lid.current.visible = m.opacity > 0.01;
    }

    if (liquid.current) {
      const fill = THREE.MathUtils.clamp((p - 0.25) / 0.55, 0, 1);
      liquid.current.position.y = 0.1 + fill * 0.62;
      liquid.current.visible = fill > 0.02;
    }

    if (rim.current) {
      const m = rim.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.25 + p * 0.45 + Math.sin(t * 1.4) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={brand.cup.body}
          roughness={0.44}
          metalness={0.0}
          clearcoat={0.45}
          clearcoatRoughness={0.4}
          envMap={env}
          envMapIntensity={1.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* handle — a full torus, part of which sits inside the wall */}
      <mesh position={[0.56, 0.6, 0]} castShadow>
        <torusGeometry args={[0.185, 0.042, 20, 72]} />
        <meshPhysicalMaterial
          color={brand.cup.body}
          roughness={0.44}
          metalness={0.0}
          clearcoat={0.45}
          clearcoatRoughness={0.4}
          envMap={env}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* crema */}
      <mesh ref={liquid} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.455, 0.42, 0.03, 72]} />
        <meshPhysicalMaterial
          color={brand.cup.crema}
          roughness={0.08}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMap={env}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* luminous rim, echoing the chandelier ring */}
      <mesh ref={rim} position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.535, 0.006, 8, 96]} />
        <meshBasicMaterial color={brand.color.aqua} transparent opacity={0.4} />
      </mesh>

      {/* lid */}
      <mesh ref={lid} position={[0, 1.14, 0]}>
        <cylinderGeometry args={[0.58, 0.55, 0.09, 72]} />
        <meshPhysicalMaterial
          color={brand.cup.lid}
          roughness={0.4}
          metalness={0.0}
          clearcoat={0.55}
          envMap={env}
          envMapIntensity={1.0}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}
