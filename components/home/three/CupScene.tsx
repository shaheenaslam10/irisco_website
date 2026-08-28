"use client";

/**
 * The IRISCO cup, in real WebGL.
 *
 * Which cup gets used is decided by `cupModel` in `../content`: point it at a
 * GLB and the generated model is loaded and normalised; leave it null and the
 * procedural lathe stands in. Everything around it — lighting, steam, orbiting
 * beans, the camera dolly — is shared either way.
 *
 * Motion is driven by two numbers read inside `useFrame`: an intro ramp and
 * scroll progress. No React state is touched per frame.
 */

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Beans, Ground, Lighting, Rig, Steam } from "./parts";
import { ProceduralCup } from "./ProceduralCup";
import { ModelCup } from "./ModelCup";
import { cupModel } from "../content";

function Stage({ intro }: { intro: React.MutableRefObject<number> }) {
  return (
    <>
      <Lighting />
      <Rig />
      <Ground />
      <Suspense fallback={null}>
        {cupModel ? <ModelCup url={cupModel} intro={intro} /> : <ProceduralCup intro={intro} />}
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
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Stage intro={intro} />
      </Canvas>
    </div>
  );
}
