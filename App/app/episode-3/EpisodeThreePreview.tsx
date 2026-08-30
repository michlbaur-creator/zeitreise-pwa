"use client";

import Link from "next/link";
import { useState } from "react";
import { EpisodeSeriesNav } from "../components/EpisodeSeriesNav";
import { SiteFooter } from "../components/SiteFooter";
import {
  type EpisodeThreeScene,
  episodeThreeSceneOneImages,
  episodeThreeSceneTwoDraft,
  episodeThreeSceneThreeDraft,
  episodeThreeSceneFourDraft,
  episodeThreeSceneFiveDraft,
  episodeThreeSceneSixDraft,
  episodeThreeSceneSevenDraft,
  episodeThreeSceneEightDraft,
  episodeThreeSceneNineDraft,
  episodeThreeSceneVideos,
  episodeThreeScenes,
} from "../data/episode3";

function EpisodeThreeClip({
  src,
  poster,
  label,
  playback,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  playback: "loop" | "hold";
  className?: string;
}) {
  return (
    <video
      className={`ep3-scene-video ${className}`.trim()}
      src={src}
      poster={poster}
      aria-label={label}
      controls
      loop={playback === "loop"}
      playsInline
      preload="metadata"
    />
  );
}

function SpeakerText({
  scene,
  initiallyOpen = false,
}: {
  scene: EpisodeThreeScene;
  initiallyOpen?: boolean;
}) {
  return (
    <details className="ep3-script" open={initiallyOpen}>
      <summary>
        <span>Sprechertext lesen</span>
        <small>{scene.timeLabel}</small>
      </summary>
      <div className="ep3-script-copy">
        {scene.speakerText.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="ep3-script-status">
        Rekonstruierte Arbeitsgrundlage · Sprecheraufnahme steht noch aus
      </p>
    </details>
  );
}

function SceneActivities({ scene }: { scene: EpisodeThreeScene }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <>
      <details className="ep3-activities">
        <summary>
          <span>Entdecken &amp; Szenenquiz</span>
          <small>2 Wissenspunkte · 1 Frage</small>
        </summary>
        <div className="ep3-activities-grid">
          <section className="ep3-discoveries" aria-label={`Entdecken in Szene ${scene.id}`}>
            <p className="eyebrow">Entdecken</p>
            {scene.discoveries.map((discovery) => (
              <article key={discovery.title}>
                <h3>{discovery.title}</h3>
                <p>{discovery.text}</p>
              </article>
            ))}
          </section>

          <section className="ep3-scene-quiz" aria-labelledby={`ep3-quiz-${scene.id}`}>
            <p className="eyebrow">Quiz</p>
            <h3 id={`ep3-quiz-${scene.id}`}>{scene.quiz.question}</h3>
            <div className="ep3-quiz-answers">
              {scene.quiz.answers.map((answer, answerIndex) => {
                const isSelected = selectedAnswer === answerIndex;
                const isCorrect = answerIndex === scene.quiz.correctAnswer;
                const resultClass = selectedAnswer === null
                  ? ""
                  : isCorrect
                    ? "is-correct"
                    : isSelected
                      ? "is-wrong"
                      : "";

                return (
                  <button
                    type="button"
                    className={resultClass}
                    aria-pressed={isSelected}
                    key={answer}
                    onClick={() => setSelectedAnswer(answerIndex)}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
            {selectedAnswer !== null ? (
              <p className="ep3-quiz-result" role="status">
                {selectedAnswer === scene.quiz.correctAnswer
                  ? "Richtig."
                  : "Noch nicht. Versuch es noch einmal."}
              </p>
            ) : null}
          </section>
        </div>
        <p className="ep3-activity-status">Rekonstruierte Arbeitsgrundlage</p>
      </details>
      <EpisodeSeriesNav currentEpisode={3} />
    </>
  );
}

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
            <span className="ep3-preview-badge">Öffentliche Vorschau · nur per Direktlink</span>
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
            Die vollständige technische Bildfolge liegt nun vor: neun kurze
            Stationen, leicht erzählt und mit dem vertiefenden Wissen im
            Hintergrund. Alle neun Szenenbilder sind jetzt gemeinsam
            freigegeben. Die rekonstruierten Sprechertexte stehen direkt bei
            den Bildern zum Mitlesen bereit.
          </p>
        </div>
        <div className="ep3-progress" aria-label={`${readyScenes} von ${episodeThreeScenes.length} Szenenbildern freigegeben`}>
          <strong>{readyScenes}/{episodeThreeScenes.length}</strong>
          <span>Szenenbilder freigegeben</span>
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
          {pastVisible ? (
            <EpisodeThreeClip
              className="ep3-time-video"
              src={episodeThreeSceneVideos[1].src}
              poster={episodeThreeSceneOneImages.past}
              label="Veo-Clip: Zeitsprung zur Landschaft um 12.000 vor Christus"
              playback={episodeThreeSceneVideos[1].playback}
            />
          ) : null}
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
        <SpeakerText scene={episodeThreeScenes[0]} initiallyOpen />
        <SceneActivities scene={episodeThreeScenes[0]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-two-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneTwoDraft}")` }}
        >
          <EpisodeThreeClip
            src={episodeThreeSceneVideos[2].src}
            poster={episodeThreeSceneTwoDraft}
            label="Veo-Clip: Jägerinnen und Sammlerinnen ernten wilde Gräser und verarbeiten Samen"
            playback={episodeThreeSceneVideos[2].playback}
          />
        </div>
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 02 · Bild freigegeben</p>
          <h2 id="ep3-scene-two-title">Leben ohne Acker</h2>
          <p>
            Sammeln, mahlen, weiterziehen: Das Bild zeigt viel Wissen und viel
            Arbeit – aber noch kein Feld, keine Herde und kein festes Dorf.
          </p>
          <span>Veo-Clip · Endlosschleife</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[1]} />
        <SceneActivities scene={episodeThreeScenes[1]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-three-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneThreeDraft}")` }}
        >
          <EpisodeThreeClip
            src={episodeThreeSceneVideos[3].src}
            poster={episodeThreeSceneThreeDraft}
            label="Veo-Clip: Menschen bearbeiten und bewegen T-förmige Kalksteinpfeiler bei Göbekli Tepe"
            playback={episodeThreeSceneVideos[3].playback}
          />
        </div>
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 03 · Bild freigegeben</p>
          <h2 id="ep3-scene-three-title">Steine für die Ewigkeit</h2>
          <p>
            T-förmige Kalksteinpfeiler, Steinwerkzeuge und gemeinsame Arbeit:
            Göbekli Tepe zeigt, welche großen Vorhaben Menschen schon vor rund
            11.000 Jahren organisieren konnten. Die genaue Funktion der Anlagen
            kennen wir bis heute nicht.
          </p>
          <span>Veo-Clip · Endlosschleife</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[2]} />
        <SceneActivities scene={episodeThreeScenes[2]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-four-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneFourDraft}")` }}
        >
          <EpisodeThreeClip
            src={episodeThreeSceneVideos[4].src}
            poster={episodeThreeSceneFourDraft}
            label="Veo-Clip: frühes Jericho an der Quelle mit Lehmziegelhäusern, Mauer und Turm"
            playback={episodeThreeSceneVideos[4].playback}
          />
        </div>
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 04 · Bild freigegeben</p>
          <h2 id="ep3-scene-four-title">Ein Ort bleibt</h2>
          <p>
            Das Bild zeigt das frühe Jericho an der Quelle – mit runden
            Lehmziegelhäusern, Mauer und Turm.
          </p>
          <span>Veo-Clip · Endlosschleife</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[3]} />
        <SceneActivities scene={episodeThreeScenes[3]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-five-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneFiveDraft}")` }}
          role="img"
          aria-label="Freigegebenes Szenenbild: frühe Getreideähren und eine ruhige Ernte von Hand über viele Generationen"
        />
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 05 · Bild freigegeben</p>
          <h2 id="ep3-scene-five-title">Eine Ähre verändert sich</h2>
          <p>
            Das freigegebene Bild zeigt frühe Getreideähren bei der Ernte. Manche
            Ähren bleiben am Halm ganz, während wilde Formen ihre Körner
            leichter verlieren.
          </p>
          <span>Bild freigegeben</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[4]} />
        <SceneActivities scene={episodeThreeScenes[4]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-six-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneSixDraft}")` }}
        >
          <EpisodeThreeClip
            src={episodeThreeSceneVideos[6].src}
            poster={episodeThreeSceneSixDraft}
            label="Veo-Clip: frühe, noch wild wirkende Ziegenherde unter menschlicher Betreuung"
            playback={episodeThreeSceneVideos[6].playback}
          />
        </div>
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 06 · Bild freigegeben</p>
          <h2 id="ep3-scene-six-title">Aus Jagd wird Herde</h2>
          <p>
            Das freigegebene Bild zeigt eine frühe, noch wild wirkende
            Ziegenherde unter menschlicher Betreuung.
          </p>
          <span>Veo-Clip · Endlosschleife</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[5]} />
        <SceneActivities scene={episodeThreeScenes[5]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-seven-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneSevenDraft}")` }}
          role="img"
          aria-label="Freigegebenes Szenenbild: drei getrennte Anfänge des Pflanzenanbaus mit frühem Getreide, Reis und teosinteartigem Mais"
        />
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 07 · Bild freigegeben</p>
          <h2 id="ep3-scene-seven-title">Eine Idee entsteht immer wieder</h2>
          <p>
            Das freigegebene Bild stellt drei getrennte Entwicklungen
            nebeneinander: frühes Getreide in Südwestasien, Reis in Ostasien
            und teosinteartige Frühformen des Maises in Mesoamerika. Die
            Bildteile sind ein Vergleich, kein gemeinsamer Ort.
          </p>
          <span>Bild freigegeben</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[6]} />
        <SceneActivities scene={episodeThreeScenes[6]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-eight-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneEightDraft}")` }}
        >
          <EpisodeThreeClip
            src={episodeThreeSceneVideos[8].src}
            poster={episodeThreeSceneEightDraft}
            label="Veo-Clip: dicht aneinandergefügte Lehmziegelhäuser in Çatalhöyük mit Wegen und Zugängen über die Dächer"
            playback={episodeThreeSceneVideos[8].playback}
          />
        </div>
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 08 · Bild freigegeben</p>
          <h2 id="ep3-scene-eight-title">Leben Wand an Wand</h2>
          <p>
            Das freigegebene Bild zeigt Çatalhöyüks dicht aneinandergefügte
            Lehmziegelhäuser. Zwischen ihnen liegen keine normalen Straßen;
            Menschen bewegen sich über die Dächer und steigen durch Öffnungen
            in ihre Häuser hinab.
          </p>
          <span>Veo-Clip · Endlosschleife</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[7]} />
        <SceneActivities scene={episodeThreeScenes[7]} />
      </section>

      <section className="ep3-next-draft" aria-labelledby="ep3-scene-nine-title">
        <div
          className="ep3-next-draft-image"
          style={{ backgroundImage: `url("${episodeThreeSceneNineDraft}")` }}
          role="img"
          aria-label="Freigegebenes Szenenbild: wiederholte Mahlarbeit, Herdrauch, Tierhaltung und Abfälle nahe an einer frühen dauerhaften Siedlung"
        />
        <div className="ep3-next-draft-copy">
          <p className="eyebrow">Szene 09 · Bild freigegeben</p>
          <h2 id="ep3-scene-nine-title">Der Preis des Bleibens</h2>
          <p>
            Das freigegebene Bild bündelt belegte Belastungen der ersten
            dauerhaften Siedlungen: wiederholte Arbeit beim Mahlen, Rauch sowie
            Tierhaltung und Abfälle nahe an den Häusern. Sichtbare Krankheit
            wird nicht behauptet.
          </p>
          <span>Bild freigegeben</span>
        </div>
        <SpeakerText scene={episodeThreeScenes[8]} />
        <SceneActivities scene={episodeThreeScenes[8]} />
      </section>

      <aside className="ep3-editorial-note">
        <p className="eyebrow">Redaktioneller Schutz</p>
        <h2>Freigegebene Texte bleiben unangetastet.</h2>
        <p>
          Die Sprechertexte wurden wortgetreu aus dem rekonstruierten Dokument
          im Austauschordner übernommen und sind hier ausdrücklich noch als
          Arbeitsgrundlage gekennzeichnet. Hotspots und Quizfragen folgen aus
          demselben Verlauf; die Vorschau erfindet dafür keine Ersatzfassung.
        </p>
      </aside>

      <SiteFooter />
    </main>
  );
}
