const prototypeBase = "/assets/irisco/generated/prototype/coffee-v2";
const asset = (name: string) => `${prototypeBase}/${name}`;

const shots = [
  { name: "shot-01", src: asset("shot-01-cafe-approach.mp4"), poster: asset("shot-01-poster.jpg") },
  { name: "shot-02", src: asset("shot-02-cafe-to-white.mp4"), poster: asset("shot-02-poster.jpg") },
  { name: "shot-03", src: asset("shot-03-white-to-cafe.mp4"), poster: asset("shot-03-poster.jpg") },
] as const;

function PrototypeVideo({ name, src, poster }: (typeof shots)[number]) {
  return (
    <div className={`opening-video-layer opening-video-${name}`} data-opening-video={name}>
      <video
        className="opening-video"
        src={src}
        poster={poster}
        preload="auto"
        muted
        playsInline
        aria-hidden="true"
      />
    </div>
  );
}

export function ArrivalScene() {
  return (
    <section className="opening-scene" id="main" data-story-scene="opening">
      <div className="opening-stage" aria-label="IRISCO coffee ritual">
        <div className="opening-video-world" aria-hidden="true">
          {shots.map((shot) => <PrototypeVideo key={shot.name} {...shot} />)}
        </div>
        <div className="opening-luminance" aria-hidden="true" />

        <div className="opening-copy" aria-live="polite">
          <div className="opening-text-state opening-text-arrival">
            <p className="eyebrow">Coffee · Craft · Culture · Conversation</p>
            <h1>Everything finds<br />its place at IRISCO.</h1>
            <p className="opening-copy-body">A familiar ritual begins at the counter.</p>
          </div>
          <div className="opening-text-state opening-text-ritual" aria-hidden="true">
            <p className="eyebrow">The ritual begins</p>
            <h2>Made to<br />pause time.</h2>
          </div>
          <div className="opening-text-state opening-text-reveal" aria-hidden="true">
            <p className="eyebrow">A familiar ritual</p>
            <h2>The moment<br />opens.</h2>
          </div>
          <div className="opening-text-state opening-text-coffee" aria-hidden="true">
            <p className="eyebrow">In the making</p>
            <h2>Coffee,<br />in motion.</h2>
          </div>
          <div className="opening-text-state opening-text-resolution" aria-hidden="true">
            <p className="eyebrow">At IRISCO</p>
            <h2>The cup<br />finds its place.</h2>
          </div>
        </div>

        <div className="opening-chapter-marker" aria-hidden="true">
          <span>IRISCO</span><i /><span>01 / The ritual</span>
        </div>
        <p className="opening-scroll-cue" aria-hidden="true">Scroll to enter</p>
      </div>
    </section>
  );
}
