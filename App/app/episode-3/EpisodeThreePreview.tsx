"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EpisodeSeriesNav } from "../components/EpisodeSeriesNav";
import { SiteFooter } from "../components/SiteFooter";
import {
  type EpisodeThreeScene,
  episodeThreeSceneVideos,
  episodeThreeScenes,
} from "../data/episode3";
import { EpisodeThreeVisual } from "./EpisodeThreeVisual";

type Panel = "sprecher" | "entdecken" | "quiz";

const sceneSymbols = ["↶", "⌁", "◇", "⌂", "≋", "♑", "◎", "▦", "⚖"];

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function durationForScene(scene: EpisodeThreeScene) {
  const words = scene.speakerText.join(" ").trim().split(/\s+/).length;
  return Math.max(24, Math.round(words / 2.35));
}

function EpisodeThreeTimeline({
  scene,
  onSelect,
}: {
  scene: EpisodeThreeScene;
  onSelect: (index: number) => void;
}) {
  const activeIndex = scene.id - 1;
  const travelled = (activeIndex / (episodeThreeScenes.length - 1)) * 100;

  return (
    <nav className="earth-timeline ep2-timeline ep3-timeline" aria-label="Navigation durch Episode 3">
      <div className="earth-timeline-current">
        <span>Du bist hier</span>
        <strong>{scene.timeLabel}</strong>
      </div>
      <div className="earth-timeline-scroll">
        <div className="earth-timeline-track" aria-hidden="true">
          <span style={{ width: `${travelled}%` }} />
        </div>
        <div className="earth-timeline-stops">
          {episodeThreeScenes.map((item, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-current" : ""}
              onClick={() => onSelect(index)}
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`Szene ${item.id}: ${item.title}, ${item.timeLabel}`}
              key={item.id}
            >
              <i aria-hidden="true">{sceneSymbols[index]}</i>
              <span>{item.title}</span>
              <small>{item.timeLabel}</small>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function EpisodeThreePreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState<Panel>("entdecken");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [introOpen, setIntroOpen] = useState(true);
  const [muted, setMuted] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const progressRef = useRef(0);
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
    target: EventTarget | null;
  } | null>(null);

  const scene = episodeThreeScenes[currentIndex];
  const sceneDuration = durationForScene(scene);
  const sceneHasVideo = scene.id in episodeThreeSceneVideos;

  const goToScene = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= episodeThreeScenes.length) return;
    setCurrentIndex(nextIndex);
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(true);
    setSelectedOption(null);
    setQuizChecked(false);
    window.localStorage.setItem("zeitreise-episode3-current-scene", String(nextIndex));
  }, []);

  useEffect(() => {
    let cancelled = false;
    window.queueMicrotask(() => {
      if (cancelled) return;
      const storedIndex = Number(
        window.localStorage.getItem("zeitreise-episode3-current-scene") ?? "0",
      );
      const introSeen =
        window.localStorage.getItem("zeitreise-episode3-intro-seen") === "1";
      if (
        Number.isInteger(storedIndex) &&
        storedIndex >= 0 &&
        storedIndex < episodeThreeScenes.length
      ) {
        setCurrentIndex(storedIndex);
      }
      setIntroOpen(!introSeen);
      setIsPlaying(introSeen);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;
    let frame = 0;
    let previous = window.performance.now();
    const tick = (now: number) => {
      const next = Math.min(
        1,
        progressRef.current + (now - previous) / (sceneDuration * 1000),
      );
      previous = now;
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) {
        setIsPlaying(false);
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPlaying, sceneDuration]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }
    const sceneIds = [scene.id, episodeThreeScenes[currentIndex + 1]?.id].filter(
      (sceneId): sceneId is number => typeof sceneId === "number",
    );
    void navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "CACHE_SCENES",
        episode: 3,
        sceneIds,
      });
    });
  }, [currentIndex, scene.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "BUTTON", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") goToScene(currentIndex - 1);
      if (event.key === "ArrowRight") goToScene(currentIndex + 1);
      if (event.key === " ") {
        event.preventDefault();
        if (progress >= 1) {
          progressRef.current = 0;
          setProgress(0);
        }
        setIsPlaying((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, goToScene, progress]);

  const startSceneSwipe = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, a, input, textarea, select, [role='slider']")) return;
    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
      target: event.target,
    };
  }, []);

  const finishSceneSwipe = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = event.clientY - start.y;
    if (
      Math.abs(horizontalDistance) < 70 ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.25
    ) return;
    goToScene(currentIndex + (horizontalDistance < 0 ? 1 : -1));
  }, [currentIndex, goToScene]);

  const startJourney = () => {
    window.localStorage.setItem("zeitreise-episode3-intro-seen", "1");
    setIntroOpen(false);
    setCurrentIndex(0);
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (progress >= 1) {
      progressRef.current = 0;
      setProgress(0);
    }
    setIsPlaying((value) => !value);
  };

  const seek = (value: number) => {
    const safe = Math.min(1, Math.max(0, value));
    progressRef.current = safe;
    setProgress(safe);
  };

  const answerQuiz = (index: number) => {
    setSelectedOption(index);
    setQuizChecked(true);
  };

  return (
    <main className="app-shell ep2-shell ep3-shell">
      {introOpen ? (
        <section className="ep2-intro" role="dialog" aria-modal="true" aria-label="Beginn von Episode 3">
          <div className="ep2-intro-copy">
            <p className="eyebrow">Zeitreise · Episode 3</p>
            <h2>Vom Wandern zum Bleiben</h2>
            <strong>Wie Menschen die Welt veränderten</strong>
            <p>Die Reise geht in der Welt vor ungefähr 14.000 Jahren weiter.</p>
            <button type="button" onClick={startJourney}>Episode beginnen <span aria-hidden="true">→</span></button>
            <button className="ep2-intro-back" type="button" onClick={() => { setIntroOpen(false); setIsPlaying(true); }}>Direkt zur ersten Szene</button>
          </div>
        </section>
      ) : null}

      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <p className="eyebrow">Episode 3</p>
            <h1>Zeitreise <span>Vom Wandern zum Bleiben</span></h1>
          </div>
        </div>
        <div className="header-actions">
          <Link className="quiet-button ep2-episode-link" href="/episode-2/">← Episode 2</Link>
          <button className="quiet-button intro-replay" type="button" onClick={() => { setIsPlaying(false); setIntroOpen(true); }}>Anfang ansehen</button>
        </div>
      </header>

      <EpisodeThreeTimeline scene={scene} onSelect={goToScene} />

      <div className="workspace">
        <section className="player-column">
          <div className="scene-heading">
            <div>
              <p className="eyebrow">Szene {twoDigits(scene.id)} von {episodeThreeScenes.length}</p>
              <h2>{scene.title}</h2>
            </div>
            <div className="scene-facts"><span>{scene.timeLabel}</span></div>
          </div>

          <div
            className="scene-swipe-surface"
            onPointerDown={startSceneSwipe}
            onPointerUp={finishSceneSwipe}
            onPointerCancel={() => { swipeStartRef.current = null; }}
          >
            <EpisodeThreeVisual
              scene={scene}
              isPlaying={isPlaying}
              muted={muted}
              progress={progress}
            />
          </div>

          <div className="player-controls">
            <button className="round-control" type="button" onClick={() => goToScene(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Vorherige Szene">←</button>
            <button className={`play-control ${isPlaying ? "is-playing" : ""}`} type="button" onClick={togglePlayback}>
              <span className="play-orb" style={{ "--play-progress": `${progress * 100}%` } as CSSProperties} aria-hidden="true"><i /></span>
              <span className="play-label">{isPlaying ? "Pause" : progress >= 1 ? "Noch einmal" : "Szene starten"}</span>
              <span className="play-wave" aria-hidden="true"><i /><i /><i /></span>
            </button>
            <button className={`sound-control ${sceneHasVideo && !muted ? "is-on" : ""}`} type="button" aria-pressed={sceneHasVideo && !muted} onClick={() => setMuted((value) => !value)} disabled={!sceneHasVideo}>
              <span aria-hidden="true">{sceneHasVideo && !muted ? "◖))" : "◖×"}</span><span className="sound-label">Filmton</span>
            </button>
            <label className="scrubber"><span className="sr-only">Position in der Szene</span><input type="range" min="0" max="1000" value={Math.round(progress * 1000)} onChange={(event) => seek(Number(event.target.value) / 1000)} style={{ "--seek": `${progress * 100}%` } as CSSProperties} /></label>
            <span className="timecode">{formatTime(progress * sceneDuration)} / {formatTime(sceneDuration)}</span>
            <button className="next-control" type="button" onClick={() => goToScene(currentIndex + 1)} disabled={currentIndex === episodeThreeScenes.length - 1}>Weiter <span aria-hidden="true">→</span></button>
          </div>
          <EpisodeSeriesNav currentEpisode={3} />
          <p className="keyboard-hint">Nach links wischen oder Pfeiltasten wechseln die Szene · Leertaste startet oder pausiert</p>
          <button className={`details-toggle ${detailsOpen ? "is-open" : ""}`} type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen} aria-controls="episode3-details"><span>{detailsOpen ? "Zusatzwissen schließen" : "Mehr entdecken"}</span><i aria-hidden="true">{detailsOpen ? "−" : "+"}</i></button>
        </section>

        <aside id="episode3-details" className={`content-panel ${detailsOpen ? "is-open" : ""}`}>
          <div className="panel-tabs" aria-label="Szeneninhalt">
            <button type="button" aria-pressed={panel === "sprecher"} className={panel === "sprecher" ? "is-active" : ""} onClick={() => setPanel("sprecher")}>Text lesen</button>
            <button type="button" aria-pressed={panel === "entdecken"} className={panel === "entdecken" ? "is-active" : ""} onClick={() => setPanel("entdecken")}>Entdecken</button>
            <button type="button" aria-pressed={panel === "quiz"} className={panel === "quiz" ? "is-active" : ""} onClick={() => setPanel("quiz")}>Quiz</button>
          </div>

          {panel === "sprecher" ? (
            <section className="panel-section ep3-speaker-text">
              <blockquote>{scene.speakerText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
            </section>
          ) : null}

          {panel === "entdecken" ? (
            <section className="panel-section interactions">
              <div className="interaction-block ep3-discovery-list">
                <div className="section-label"><span>Entdecken</span><i>2 Punkte</i></div>
                {scene.discoveries.map((discovery, index) => (
                  <article key={discovery.title}>
                    <span>{index + 1}</span>
                    <p><strong>{discovery.title}</strong><small>{discovery.text}</small></p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {panel === "quiz" ? (
            <section className="panel-section interactions">
              <div className="interaction-block quiz-panel">
                <div className="section-label"><span>Quiz zu dieser Szene</span></div>
                <h3>{scene.quiz.question}</h3>
                <div className="quiz-options">
                  {scene.quiz.answers.map((answer, index) => {
                    const selected = selectedOption === index;
                    const correct = quizChecked && selected && index === scene.quiz.correctAnswer;
                    const wrong = quizChecked && selected && index !== scene.quiz.correctAnswer;
                    return (
                      <button type="button" className={`${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`} onClick={() => answerQuiz(index)} aria-pressed={selected} key={answer}>
                        <span>{String.fromCharCode(65 + index)}</span>{answer}
                      </button>
                    );
                  })}
                </div>
                {quizChecked ? (
                  <div className={`quiz-result ${selectedOption === scene.quiz.correctAnswer ? "is-correct" : "is-wrong"}`} role="status">
                    <strong>{selectedOption === scene.quiz.correctAnswer ? "Richtig." : "Noch nicht richtig."}</strong>
                    {selectedOption !== scene.quiz.correctAnswer ? <span>Versuch es einfach noch einmal.</span> : null}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      <SiteFooter />
    </main>
  );
}
