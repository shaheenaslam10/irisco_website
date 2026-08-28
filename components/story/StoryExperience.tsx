"use client";

import { useRef } from "react";
import { useStoryMotion } from "./hooks/useStoryMotion";
import { ArrivalScene } from "./scenes/ArrivalScene";
import { ManifestoScene } from "./scenes/ManifestoScene";
import { RitualScene } from "./scenes/RitualScene";
import { CounterScene } from "./scenes/CounterScene";
import { PantryScene } from "./scenes/PantryScene";
import { SpaceScene } from "./scenes/SpaceScene";
import { InvitationScene } from "./scenes/InvitationScene";

export function StoryExperience() {
  const root = useRef<HTMLDivElement>(null);
  useStoryMotion(root);

  return (
    <div ref={root}>
      <ArrivalScene />
      <ManifestoScene />
      <RitualScene />
      <CounterScene />
      <PantryScene />
      <SpaceScene />
      <InvitationScene />
    </div>
  );
}
