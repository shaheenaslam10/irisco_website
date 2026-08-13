import Image from "next/image";
import { chessCellCount, storyImage } from "../storyContent";

export function CommunityScene() {
  return (
    <section className="story-scene community-scene" data-story-scene="community">
      <div className="community-photo">
        <Image src={storyImage("community-chess")} fill sizes="100vw" alt="IRISCO guests sharing a game of chess around a café table" />
      </div>
      <div className="chess-overlay" aria-hidden="true">
        {Array.from({ length: chessCellCount }).map((_, index) => <i key={index} />)}
        <b className="chess-piece piece-one">♞</b>
        <b className="chess-piece piece-two">♜</b>
        <b className="chess-piece piece-three">♟</b>
      </div>
      <div className="community-copy light-copy">
        <p className="chapter-index light">06 / Your move</p>
        <h2>Some visits become<br />conversations.</h2>
        <p>Coffee, a game, a book, and enough time to stay.</p>
      </div>
    </section>
  );
}
