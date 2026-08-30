"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "../components/SiteFooter";
import {
  episodeThreeSceneOneImages,
  episodeThreeSceneTwoDraft,
  episodeThreeSceneThreeDraft,
  episodeThreeScenes,
} from "../data/episode3";

export default function EpisodeThreePreview() {
  const [pastVisible, setPastVisible] = useState(false);
  const readyScenes = episodeThreeScenes.filter(
    (scene) => scene.imageStatus === "ready",
  ).length;

  return (
    <main className="app-shell ep3-shell">
      <header className="app-header ep3-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <p className="eyebrow">Episode 3 · Teil 1</p>
            <span className="ep3-preview-badge">Technische Vorschau · noch nicht veröffentlicht</span>
            <h1>Zeitreise <span>Vom Wandern zum Bleiben</span></h1>
          </div>
        </div>
        <div className="header-actions">
          <Link className="quiet-button ep3-back-link" href="/episode-2/">← Episode 2</Link>
        </div>
      </header>

      <section className="ep3-preview-lead">
        <div>
          <p className="eyebrow">Wie Menschen die Welt veränderten</p>
          <h2>Der erste große Umbau beginnt.</h2>
          <p>
            Zunächst bleiben wir bei der freigegebenen Dramaturgie: neun kurze
            Stationen, leicht erzählt und mit dem vertiefenden Wissen im
            Hintergrund. Das erste Übergangsbild ist bereits eingebaut.
          </p>
        </div>
        <div className="ep3-progress" aria-label={`${readyScenes} von ${episodeThreeScenes.length} Szenenbildern fertig`}>
          <strong>{readyScenes}/{episodeThreeScenes.length}</strong>
          <span>Szenenbilder fertig</span>
        </div>
      </section>

      <section className="ep3-scene-preview" aria-labelledby="ep3-scene-one-title">
        <div className="scene-heading ep3-scene-heading">
          <div>
            <p className="eyebrow">Szene 01 von 09</p>
            <h2 id="ep3-scene-one-title">Noch einmal zurück</h2>
          </div>
          <div className="scene-facts">
            <span>Um 12.000 v. Chr.</span>
            <em>Bildpaar fertig</em>
          </div>
        </div>

        <div className={`ep3-time-transition ${pastVisible ? "shows-past" : "shows-present"}`}>
          <div
            className="ep3-time-image ep3-time-image-present"
            style={{ backgroundImage: `url("${episodeThreeSceneOneImages.present}")` }}
            aria-hidden="true"
          />
          <div
            className="ep3-time-image ep3-time-image-past"
            style={{ backgroundImage: `url("${episodeThreeSceneOneImages.past}")` }}
            aria-hidden="true"
          />
          <div className="ep3-time-caption" aria-live="polite">
            <span>{pastVisible ? "Um 12.000 v. Chr." : "Heute"}</span>
            <strong>{pastVisible ? "Die Reise geht weiter." : "Der Zeitfelsen wartet schon."}</strong>
          </div>
        </div>

        <div className="ep3-transition-controls" aria-label="Bildübergang prüfen">
          <button
            type="button"
            className={!pastVisible ? "is-active" : ""}
            aria-pressed={!pastVisible}
            onClick={() => setPastVisible(false)}
          >
            Heute
          </button>
          <button
            type="button"
            className={pastVisible ? "is-active" : ""}
            aria-pressed={pastVisible}
            onClick={() => setPastVisible(true)}
          >
            Zeitsprung starten <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-two-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneTwoDraft}")` }}
          role="img"
          aria-label="Arbeitsentwurf: Jägerinnen und Sammlerinnen ernten wilde Gräser und verarbeiten Samen am Ende der Eiszeit"
        />
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 02 · Arbeitsentwurf</p>
          <h2 id="ep3-scene-two-title">Leben ohne Acker</h2>
          <p>
            Sammeln, mahlen, weiterziehen: Das Bild zeigt viel Wissen und viel
            Arbeit – aber noch kein Feld, keine Herde und kein festes Dorf.
          </p>
          <span>Freigabe des Bildes noch offen</span>
        </div>
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-three-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneThreeDraft}")` }}
          role="img"
          aria-label="Arbeitsentwurf: Menschen bearbeiten und bewegen T-förmige Kalksteinpfeiler bei Göbekli Tepe"
        />
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 03 · Arbeitsentwurf</p>
          <h2 id="ep3-scene-three-title">Steine für die Ewigkeit</h2>
          <p>
            T-förmige Kalksteinpfeiler, Steinwerkzeuge und gemeinsame Arbeit:
            Göbekli Tepe zeigt, welche großen Vorhaben Menschen schon vor rund
            11.000 Jahren organisieren konnten. Die genaue Funktion der Anlagen
            kennen wir bis heute nicht.
          </p>
          <span>Bildprüfung: gezogener Stein noch als Rohling lesbar</span>
        </div>
      </section>

      <aside className="ep3-editorial-note">
        <p className="eyebrow">Redaktioneller Schutz</p>
        <h2>Freigegebene Texte bleiben unangetastet.</h2>
        <p>
          Die verbindlichen Sprechertexte, Hotspots und Quizfragen werden erst
          eingesetzt, sobald sie im Projektordner vorliegen. Diese Vorschau
          erfindet dafür keine Ersatzfassung.
        </p>
      </aside>

      <SiteFooter />
    </main>
  );
}
