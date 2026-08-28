"use client";

/**
 * Everything in the hero scene that is *not* the cup itself: lighting, ground,
 * steam, orbiting beans and the camera rig.
 *
 * Kept separate so the cup can be swapped — procedural lathe today, the real
 * Tripo GLB the moment the file lands — without touching any of this.
 */

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { brand } from "@/lib/brand";
import { layer } from "../content";
import { scrollState } from "../motion/scrollState";

/** Deterministic 0…1 noise — render must be pure, so no Math.random(). */
export function seeded(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** A soft round blob, used for steam and the ground contact shadow. */
export function softTexture(inner = "rgba(255,255,255,0.95)") {
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
 * environment a ceramic or paper surface reads as flat plastic; with one it has
 * a horizon, a cool sky and a warm bounce off the table.
 */
export function studioEnvironment() {
  const c = document.createElement("canvas");
  c.width = 16;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, "#38505e");
  g.addColorStop(0.42, "#101417");
  g.addColorStop(0.62, "#3a2412");
  g.addColorStop(1.0, "#050403");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 256);
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------------------------------------------------------------- lighting */

export function Lighting() {
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

export function Ground() {
  const tex = useMemo(() => softTexture("rgba(0,0,0,0.85)"), []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
      <planeGeometry args={[3.4, 3.4]} />
      <meshBasicMaterial map={tex} transparent opacity={0.75} depthWrite={false} />
    </mesh>
  );
}

/** Slow dolly-out as the hero leaves: the cup recedes, the story arrives. */
export function Rig() {
  useFrame((state) => {
    const hero = scrollState.hero;
    const z = 4.35 + hero * 1.15;
    const y = 0.62 + hero * 0.42;
    state.camera.position.z += (z - state.camera.position.z) * 0.06;
    state.camera.position.y += (y - state.camera.position.y) * 0.06;
    state.camera.lookAt(0, 0.52, 0);
  });
  return null;
}

/* ------------------------------------------------------------------- steam */

export function Steam({ intro }: { intro: React.MutableRefObject<number> }) {
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
      child.scale.setScalar(cfg.scale * (0.5 + life * 1.3));
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
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

/* ------------------------------------------------------------------- beans */

export function Beans({ intro }: { intro: React.MutableRefObject<number> }) {
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
      child.scale.setScalar(cfg.scale * (0.9 + Math.sin(t * 0.9 + i) * 0.06) * intro.current);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.85 * intro.current;
    });
  });

  return (
    <group ref={group}>
      {beans.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={tex} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Shared cup motion: idle breathing plus a slow turn driven by scroll, and the
 * rise/settle of the assembly ramp.
 *
 * A plain helper rather than a hook — each cup owns its own ref and calls this
 * from inside its own `useFrame`, which keeps the mutation local to render.
 */
export function applyCupMotion(g: THREE.Group, t: number, p: number, hero: number) {
  const rotY = -0.5 + hero * 2.4 + Math.sin(t * 0.22) * 0.09;
  g.rotation.y += (rotY - g.rotation.y) * 0.06;
  g.rotation.x = -0.06 + hero * 0.16 + Math.sin(t * 0.3) * 0.012;

  const rise = -0.55 + p * 0.55;
  g.position.y = rise + hero * -0.32;
  g.position.z = hero * 0.55;
  g.scale.setScalar(0.9 + p * 0.1);
}
