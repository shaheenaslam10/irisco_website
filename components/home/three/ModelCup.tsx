"use client";

/**
 * The real IRISCO cup, loaded from a GLB.
 *
 * Two things matter when a generated model drops in: it arrives at an
 * arbitrary scale and an arbitrary origin, and it may be Draco- or
 * Meshopt-compressed. So we:
 *
 *   • configure DRACO (decoder vendored under /assets/vendor/draco/) and
 *     Meshopt up front,
 *   • clone the scene (so React strict-mode double-mounts stay safe),
 *   • measure its bounding box and normalise it — centred on X/Z, base sitting
 *     on y = 0, scaled to a known height — so the composition is identical
 *     whatever the exporter decided,
 *   • boost envMapIntensity slightly so PBR textures read under our lighting.
 */

import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { applyCupMotion } from "./parts";
import { scrollState } from "../motion/scrollState";

/** Match the procedural cup's height so nothing else in the scene moves. */
const TARGET_HEIGHT = 1.15;

function configure(loader: GLTFLoader) {
  const draco = new DRACOLoader();
  draco.setDecoderPath("/assets/vendor/draco/");
  draco.setDecoderConfig({ type: "js" });
  loader.setDRACOLoader(draco);
  loader.setMeshoptDecoder(MeshoptDecoder);
}

export function ModelCup({
  url,
  intro,
}: {
  url: string;
  intro: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, url, configure);

  useFrame((state) => {
    if (group.current) {
      applyCupMotion(group.current, state.clock.elapsedTime, intro.current, scrollState.hero);
    }
  });

  const object = useMemo(() => {
    const root = gltf.scene.clone(true);

    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const material = mesh.material as THREE.MeshStandardMaterial | undefined;
      if (material && "envMapIntensity" in material) {
        material.envMapIntensity = 1.15;
      }
    });

    // Normalise: centre on X/Z, sit the base on y = 0, scale to a known height.
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = size.y > 0.0001 ? TARGET_HEIGHT / size.y : 1;

    root.scale.setScalar(scale);
    root.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    const wrapper = new THREE.Group();
    wrapper.add(root);
    return wrapper;
  }, [gltf]);

  return <primitive object={object} ref={group} />;
}
