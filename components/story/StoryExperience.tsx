"use client";

import { useRef } from "react";
import { useStoryMotion } from "./hooks/useStoryMotion";
import { ArrivalScene } from "./scenes/ArrivalScene";
import { BakeryScene } from "./scenes/BakeryScene";
import { CoffeeScene } from "./scenes/CoffeeScene";
import { CommunityScene } from "./scenes/CommunityScene";
import { CultureScene } from "./scenes/CultureScene";
import { FinalScene } from "./scenes/FinalScene";
import { PantryScene } from "./scenes/PantryScene";
import { ProductScene } from "./scenes/ProductScene";

export function StoryExperience() {
  const root = useRef<HTMLDivElement>(null);

  useStoryMotion(root);

  return (
    <div ref={root}>
      <ArrivalScene />
      <CoffeeScene />
      <BakeryScene />
      <PantryScene />
      <ProductScene />
      <CultureScene />
      <CommunityScene />
      <FinalScene />
    </div>
  );
}
