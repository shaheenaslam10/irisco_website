/**
 * 02 · Manifesto — the thesis, on the bare teal canvas. No photograph: after the
 * room and before the coffee peak, the type carries it alone. Lines mask up on
 * scroll (desktop); the CSS default is the fully-revealed statement.
 */
export function ManifestoScene() {
  return (
    <section className="story-scene manifesto-scene" data-story-scene="manifesto">
      <span className="manifesto-halo" aria-hidden="true" />
      <div className="manifesto-inner mobile-reveal">
        <h2 className="manifesto-statement">
          <span className="line"><span className="line-inner">One room.</span></span>
          <span className="line"><span className="line-inner">Coffee to start.</span></span>
          <span className="line"><span className="line-inner">A bakery, a pantry, a gallery.</span></span>
          <span className="line"><span className="line-inner"><em>All the same afternoon.</em></span></span>
        </h2>
      </div>
    </section>
  );
}
