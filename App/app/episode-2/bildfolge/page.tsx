import type { Metadata } from "next";
import Link from "next/link";
import { episodeTwoCompactVisuals } from "../../data/episode2CompactVisuals";
import { CompactFamilyTree } from "./CompactFamilyTree";

export const metadata: Metadata = {
  title: "Bildfolge der Kompaktfassung | Zeitreise Episode 2",
  description: "Lokale Arbeitsübersicht der verdichteten Bildfolge für Episode 2.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EpisodeTwoCompactVisualPlanPage() {
  return (
    <main className="ep2-visual-plan-shell">
      <header className="ep2-visual-plan-header">
        <p className="eyebrow">Interne Arbeitsübersicht</p>
        <h1>Episode 2 in 14 Bildern</h1>
        <p>
          Die Kompaktfassung verwendet ausschließlich vorhandene Motive. Zwei Bilder
          innerhalb einer Szene bedeuten eine ruhige Überblendung – keine schnelle Montage.
        </p>
        <Link href="/episode-2/">Zur 14-Szenen-Testfassung</Link>
      </header>

      <section className="ep2-visual-plan-grid" aria-label="Bildfolge mit 14 Szenen">
        {episodeTwoCompactVisuals.map((scene) => (
          <article className="ep2-visual-plan-card" key={scene.id}>
            <div className="ep2-visual-plan-title">
              <span>{String(scene.id).padStart(2, "0")}</span>
              <div>
                <h2>{scene.title}</h2>
                <small>{scene.timeLabel}</small>
              </div>
            </div>
            <div className={`ep2-visual-plan-images is-${scene.images.length}`}>
              {scene.images.map((image) => (
                <figure key={image.src}>
                  <img src={image.src} alt="" />
                  <figcaption>
                    <strong>{image.role}</strong>
                    <span>{image.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            {scene.treeStage ? <CompactFamilyTree stage={scene.treeStage} /> : null}
            <p>{scene.movement}</p>
            <small className="ep2-visual-plan-source">
              Bisherige {scene.sourceScenes.length === 1 ? "Szene" : "Szenen"}: {scene.sourceScenes.join(" + ")}
            </small>
          </article>
        ))}
      </section>
    </main>
  );
}
