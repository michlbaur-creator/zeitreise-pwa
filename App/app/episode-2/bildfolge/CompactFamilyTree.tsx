type Stage = "split" | "branches" | "network";

export function CompactFamilyTree({ stage, overlay = false }: { stage: Stage; overlay?: boolean }) {
  if (stage === "split") {
    return (
      <figure
        className={`ep2-family-tree ep2-family-tree-split ${overlay ? "is-overlay" : ""}`}
        aria-label="Ein gemeinsamer Vorfahr verzweigt sich zur Linie von Schimpansen und Bonobos sowie zur Menschenlinie."
      >
        <div className="ep2-family-tree-canvas" aria-hidden="true">
          <i className="tree-line split-trunk" />
          <i className="tree-line split-left" />
          <i className="tree-line split-right" />
          <span className="tree-node split-root">gemeinsamer Vorfahr</span>
          <span className="tree-node split-apes">Schimpansen<br />und Bonobos</span>
          <span className="tree-node split-humans">Menschenlinie</span>
        </div>
        {!overlay ? <figcaption>Szene 3: eine gemeinsame Herkunft, danach zwei weiterlebende Linien.</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure
      className={`ep2-family-tree ep2-family-tree-${stage} ${overlay ? "is-overlay" : ""}`}
      aria-label={
        stage === "network"
          ? "Ein verzweigter Stammbaum zeigt Homo sapiens, Neandertaler und Denisova-Populationen sowie spätere genetische Verbindungen."
          : "Ein verzweigter Stammbaum zeigt Homo sapiens, Neandertaler, Denisova-Populationen und weitere Seitenzweige ohne Rangordnung."
      }
    >
      <div className="ep2-family-tree-canvas" aria-hidden="true">
        <i className="tree-line humans-trunk" />
        <i className="tree-line humans-sapiens-line" />
        <i className="tree-line humans-sister-line" />
        <i className="tree-line humans-neanderthal-line" />
        <i className="tree-line humans-denisova-line" />
        <i className="tree-line humans-side-line-a" />
        <i className="tree-line humans-side-line-b" />
        {stage === "network" ? (
          <>
            <i className="gene-line gene-sapiens-neanderthal" />
            <i className="gene-line gene-sapiens-denisova" />
          </>
        ) : null}
        <span className="tree-node humans-root">gemeinsame Vorfahren</span>
        <span className="tree-node humans-sapiens">Homo sapiens</span>
        <span className="tree-node humans-neanderthal">Neandertaler</span>
        <span className="tree-node humans-denisova">Denisova-<br />Populationen</span>
        <span className="tree-node humans-side-a">weitere<br />Seitenzweige</span>
        {stage === "network" ? <span className="gene-label">genetische Begegnungen</span> : null}
      </div>
      {!overlay ? (
        <figcaption>
          {stage === "network"
            ? "Szene 13: Einige getrennte Zweige hinterlassen später wieder gemeinsame genetische Spuren."
            : "Szene 10: mehrere Menschenformen leben gleichzeitig – keine Leiter und keine Rangordnung."}
        </figcaption>
      ) : null}
    </figure>
  );
}
