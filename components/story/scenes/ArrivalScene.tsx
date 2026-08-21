const prototypeBase = "/assets/irisco/generated/prototype/coffee-v2";
const masterVideo = `${prototypeBase}/coffee-master-prototype-v2-scrub.mp4`;
const masterPoster = `${prototypeBase}/coffee-master-prototype-v2-poster.jpg`;

export function ArrivalScene() {
  return (
    <section className="opening-scene" id="main" data-story-scene="opening">
      <div className="opening-stage" aria-label="IRISCO coffee ritual">
        <video
          className="opening-master-video"
          data-opening-master-video
          src={masterVideo}
          poster={masterPoster}
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
        />

        <div className="opening-copy" aria-live="polite">
          <p className="opening-text-state opening-text-arrival">
            Everything finds its place at IRISCO.
          </p>
          <p className="opening-text-state opening-text-ritual" aria-hidden="true">
            The ritual begins.
          </p>
          <p className="opening-text-state opening-text-resolution" aria-hidden="true">
            The cup finds its place.
          </p>
        </div>
        <p className="opening-scroll-cue" aria-hidden="true">Scroll to enter</p>
      </div>
    </section>
  );
}
