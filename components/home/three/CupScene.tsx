"use client";

/**
 * The IRISCO cup, in real WebGL.
 *
 * There is no 3D model of the cup in the repo, so it is built procedurally from
 * a lathed profile — a silhouette revolved around Y, which is how every thrown
 * ceramic cup is actually made. The result is genuine geometry: it catches
 * light, has a real interior wall, and turns in three dimensions.
 *
 * Everything is driven by two numbers — an intro ramp and scroll progress —
 * both read inside `useFrame`, so there is no React re-render per frame.
 */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { brand } from "@/lib/brand";
import { layer } from "../content";
import { scrollState } from "../motion/scrollState";

/** Deterministic 0…1 noise — render must be pure, so no Math.random(). */
function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ------------------------------------------------------------------ helpers */

/** A soft round blob, used for steam and the ground contact shadow. */
function softTexture(inner = "rgba(255,255,255,0.95)") {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, "rgba(255,255,255,0.32)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * A tiny equirectangular gradient standing in for a studio HDRI. Without an
 * environment the ceramic reads as flat plastic; with one it has a horizon, a
 * cool sky and a warm floor bounce.
 */
function studioEnvironment() {
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, "#38505e"); // cool sky
  g.addColorStop(0.42, "#101417");
  g.addColorStop(0.62, "#3a2412"); // warm bounce off the table
  g.addColorStop(1.0, "#050403");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 256);
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * The cup silhouette, as radius/height pairs.
 *
 * The profile travels up the outside, over the rim lip, then back down the
 * inside wall — so the lathe produces a hollow vessel with real thickness
 * rather than a solid lump.
 */
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

/* -------------------------------------------------------------------- cup */

function Cup({ intro }: { intro: React.MutableRefObject<number> }) {
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

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = intro.current; // 0 → 1 over the assembly
    const hero = scrollState.hero;

    if (group.current) {
      // Idle breathing, plus a slow turn driven by scroll.
      const targetRotY = -0.5 + hero * 2.4 + Math.sin(t * 0.22) * 0.09;
      group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;
      group.current.rotation.x = -0.06 + hero * 0.16 + Math.sin(t * 0.3) * 0.012;
      // Rise into place as the page assembles, then settle back with scroll.
      const rise = -0.55 + p * 0.55;
      group.current.position.y = rise + hero * -0.32;
      group.current.position.z = hero * 0.55;
      const s = 0.9 + p * 0.1;
      group.current.scale.setScalar(s);
    }

    if (lid.current) {
      // Lifts off, tilts, and drifts out of frame as the assembly plays.
      const lift = p * 1.5;
      lid.current.position.y = 1.14 + lift;
      lid.current.rotation.z = p * 0.5;
      lid.current.rotation.x = p * 0.22;
      const m = lid.current.material as THREE.MeshPhysicalMaterial;
      m.opacity = Math.max(0, 1 - p * 1.35);
      lid.current.visible = m.opacity > 0.01;
    }

    if (liquid.current) {
      // Crema fills once the lid is off.
      const fill = THREE.MathUtils.clamp((p - 0.25) / 0.55, 0, 1);
      liquid.current.position.y = 0.1 + fill * 0.62;
      liquid.current.visible = fill > 0.02;
    }

    if (rim.current) {
      const m = rim.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.25 + p * 0.45 + Math.sin(t * 1.4) * 0.05;
    }

    void delta;
  });

  return (
    <group ref={group}>
      {/* body */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={brand.cup.navy}
          roughness={0.3}
          metalness={0.0}
          clearcoat={0.7}
          clearcoatRoughness={0.28}
          envMap={env}
          envMapIntensity={1.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* handle — a full torus, part of which sits inside the wall */}
      <mesh position={[0.56, 0.6, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.185, 0.042, 20, 72]} />
        <meshPhysicalMaterial
          color={brand.cup.navy}
          roughness={0.3}
          metalness={0.0}
          clearcoat={0.7}
          clearcoatRoughness={0.28}
          envMap={env}
          envMapIntensity={1.15}
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
          color={brand.color.tealSoft}
          roughness={0.35}
          metalness={0.0}
          clearcoat={0.6}
          envMap={env}
          envMapIntensity={1.0}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ steam */

function Steam({ intro }: { intro: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(() => softTexture(), []);
  const puffs = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        offset: i / 7,
        x: (seeded(i * 4 + 1) - 0.5) * 0.16,
        z: (seeded(i * 4 + 2) - 0.5) * 0.16,
        scale: 0.34 + seeded(i * 4 + 3) * 0.3,
        drift: 0.5 + seeded(i * 4 + 4) * 0.5,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const cfg = puffs[i];
      if (!cfg) return;
      const life = (t * 0.16 + cfg.offset) % 1;
      child.position.y = 1.12 + life * 1.5;
      child.position.x = cfg.x + Math.sin(t * cfg.drift + i) * 0.12 * life;
      child.position.z = cfg.z + Math.cos(t * cfg.drift * 0.8 + i) * 0.1 * life;
      const s = cfg.scale * (0.5 + life * 1.3);
      child.scale.setScalar(s);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      // Fade in, fade out, and only appear once the lid is off.
      m.opacity = Math.sin(life * Math.PI) * 0.19 * intro.current;
      (child as THREE.Mesh).rotation.z = t * 0.1 + i;
    });
  });

  return (
    <group ref={group}>
      {puffs.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ beans */

function Beans({ intro }: { intro: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const tex = useLoader(THREE.TextureLoader, layer.bean);
  const beans = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        angle: (i / 9) * Math.PI * 2,
        radius: 1.15 + (i % 3) * 0.28,
        height: 0.15 + ((i * 7) % 5) * 0.22,
        speed: 0.1 + (i % 4) * 0.03,
        scale: 0.2 + ((i * 3) % 4) * 0.05,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const hero = scrollState.hero;
    group.current.children.forEach((child, i) => {
      const cfg = beans[i];
      if (!cfg) return;
      const a = cfg.angle + t * cfg.speed + hero * 1.2;
      child.position.set(
        Math.cos(a) * cfg.radius,
        cfg.height + Math.sin(t * 0.7 + i) * 0.07 - hero * 0.2,
        Math.sin(a) * cfg.radius,
      );
      child.rotation.y = -a + Math.PI / 2;
      child.rotation.z = Math.sin(t * 0.5 + i) * 0.4;
      const s = cfg.scale * (0.9 + Math.sin(t * 0.9 + i) * 0.06) * intro.current;
      child.scale.setScalar(s);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.85 * intro.current;
    });
  });

  return (
    <group ref={group}>
      {beans.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------ ground + light */

function Ground() {
  const tex = useMemo(() => softTexture("rgba(0,0,0,0.85)"), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
      <planeGeometry args={[3.4, 3.4]} />
      <meshBasicMaterial map={tex} transparent opacity={0.75} depthWrite={false} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.42} color="#5b6b78" />
      {/* key */}
      <directionalLight position={[2.6, 3.4, 3]} intensity={2.3} color="#fff4e6" />
      {/* amber rim, echoing the chandelier */}
      <directionalLight position={[-3.2, 1.6, -2.4]} intensity={2.0} color={brand.color.amber} />
      {/* teal fill from below */}
      <pointLight position={[0, -1.2, 2.2]} intensity={0.7} color={brand.color.aqua} />
    </>
  );
}

function Rig() {
  // `state` is a callback argument rather than a hook return, so mutating the
  // camera here is both legal and the cheapest place to dolly.
  useFrame((state) => {
    const hero = scrollState.hero;
    // A slow pull back as the hero leaves — the cup recedes, the story arrives.
    const z = 4.35 + hero * 1.15;
    const y = 0.62 + hero * 0.42;
    state.camera.position.z += (z - state.camera.position.z) * 0.06;
    state.camera.position.y += (y - state.camera.position.y) * 0.06;
    state.camera.lookAt(0, 0.52, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ canvas */

function Stage({ intro }: { intro: React.MutableRefObject<number> }) {
  return (
    <>
      <Lighting />
      <Rig />
      <Ground />
      <Suspense fallback={null}>
        <Cup intro={intro} />
        <Steam intro={intro} />
        <Beans intro={intro} />
      </Suspense>
    </>
  );
}

export default function CupScene({
  intro,
  className,
}: {
  intro: React.MutableRefObject<number>;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        className="cup-canvas"
        camera={{ fov: 34, near: 0.1, far: 60, position: [0, 0.62, 4.35] }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Stage intro={intro} />
      </Canvas>
    </div>
  );
}
