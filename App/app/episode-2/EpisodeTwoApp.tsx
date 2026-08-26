"use client";

import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAmbientSound } from "../audio/useAmbientSound";
import { FinalEpisodeQuiz } from "../components/FinalEpisodeQuiz";
import { SiteFooter } from "../components/SiteFooter";
import {
  episodeTwoMilestones,
  episodeTwoScenes,
  type EpisodeTwoScene,
} from "../data/episode2";
import {
  episodeTwoSceneHasVideo,
  episodeTwoSceneSoundtrack,
} from "../data/episode2CompactVisuals";
import type { SceneTheme } from "../data/scenes";
import { EpisodeTwoVisual } from "./EpisodeTwoVisual";

type Panel = "sprecher" | "entdecken" | "quiz";

const finalQuizSceneIds = new Set([1, 3, 5, 6, 8, 9, 11, 13, 14]);
const finalQuizScenes = episodeTwoScenes.filter((scene) =>
  finalQuizSceneIds.has(scene.id),
);

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function themeForScene(sceneId: number): SceneTheme {
  if (sceneId <= 4) return "forest";
  if (sceneId === 5) return "ash";
  if (sceneId === 9) return "volcanic";
  if (sceneId === 12) return "atmosphere";
  if (sceneId === 14) return "shore";
  return sceneId >= 13 ? "present" : "forest";
}

function EpisodeTwoTimeline({
  scene,
  onSelect,
}: {
  scene: EpisodeTwoScene;
  onSelect: (index: number) => void;
}) {
  let activeIndex = 0;
  episodeTwoMilestones.forEach((milestone, index) => {
    if (scene.id >= milestone.sceneId) activeIndex = index;
  });
  const travelled = (activeIndex / (episodeTwoMilestones.length - 1)) * 100;

  return (
    <nav className="earth-timeline ep2-timeline" aria-label="Navigation durch Episode 2">
      <div className="earth-timeline-current">
        <span>Du bist hier</span>
        <strong>{scene.timeLabel}</strong>
      </div>
      <div className="earth-timeline-scroll">
        <div className="earth-timeline-track" aria-hidden="true">
          <span style={{ width: `${travelled}%` }} />
        </div>
        <div className="earth-timeline-stops">
          {episodeTwoMilestones.map((milestone, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-current" : ""}
              onClick={() => onSelect(milestone.sceneId - 1)}
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={`${milestone.label}, ${milestone.age}`}
              key={milestone.label}
            >
              <i aria-hidden="true">{milestone.symbol}</i>
              <span>{milestone.label}</span>
              <small>{milestone.age}</small>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function EpisodeTwoApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState<Panel>("entdecken");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [ambientMutedByUser, setAmbientMutedByUser] = useState(false);
  const progressRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const updateWaitingRef = useRef(false);
  const updateReloadingRef = useRef(false);
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
    target: EventTarget | null;
  } | null>(null);

  const scene = episodeTwoScenes[currentIndex];
  const narrationPath = episodeTwoSceneSoundtrack(scene.id) ?? scene.audioPath;
  const activeHotspotData =
    activeHotspot === null ? null : scene.hotspots[activeHotspot];
  const sceneUsesVideoSound = episodeTwoSceneHasVideo(scene.id);
  const activateAmbientSound = useAmbientSound(
    100 + scene.id,
    themeForScene(scene.id),
    isPlaying,
    ambientEnabled && !sceneUsesVideoSound,
    progress,
  );

  const ensureAmbientSound = useCallback(() => {
    if (ambientMutedByUser) return;
    void activateAmbientSound().then((active) => {
      if (active) setAmbientEnabled(true);
    });
  }, [activateAmbientSound, ambientMutedByUser]);

  const goToScene = useCallback((nextIndex: number, play = false) => {
    if (nextIndex < 0 || nextIndex >= episodeTwoScenes.length) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentIndex(nextIndex);
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(play);
    setActiveHotspot(null);
    setSelectedOption(null);
    setQuizChecked(false);
    window.localStorage.setItem("zeitreise-episode2-current-scene", String(nextIndex));
  }, []);

  const startSceneSwipe = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        !event.isPrimary ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target?.closest("button, a, input, textarea, select, [role='slider']")
      ) {
        return;
      }

      swipeStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        pointerId: event.pointerId,
        target: event.target,
      };
    },
    [],
  );

  const finishSceneSwipe = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const start = swipeStartRef.current;
      swipeStartRef.current = null;
      if (!start || start.pointerId !== event.pointerId) return;

      const target = start.target as HTMLElement | null;
      if (
        target?.closest("button, a, input, textarea, select, [role='slider']")
      ) {
        return;
      }

      const horizontalDistance = event.clientX - start.x;
      const verticalDistance = event.clientY - start.y;
      const isClearHorizontalSwipe =
        Math.abs(horizontalDistance) >= 70 &&
        Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.25;

      if (!isClearHorizontalSwipe) return;

      if (horizontalDistance < 0) {
        ensureAmbientSound();
        goToScene(currentIndex + 1, true);
      } else {
        goToScene(currentIndex - 1);
      }
    },
    [currentIndex, ensureAmbientSound, goToScene],
  );

  useEffect(() => {
    let cancelled = false;
    window.queueMicrotask(() => {
      if (cancelled) return;
      const storedIndex = Number(
        window.localStorage.getItem("zeitreise-episode2-current-scene") ?? "0",
      );
      if (
        Number.isInteger(storedIndex) &&
        storedIndex >= 0 &&
        storedIndex < episodeTwoScenes.length
      ) {
        setCurrentIndex(storedIndex);
      }
      const introSeen =
        window.localStorage.getItem("zeitreise-episode2-intro-seen") === "1";
      const resumeAfterUpdate =
        window.localStorage.getItem("zeitreise-episode2-resume-after-update") === "1";
      if (resumeAfterUpdate) {
        window.localStorage.removeItem("zeitreise-episode2-resume-after-update");
      }
      setIntroOpen(!introSeen && !resumeAfterUpdate);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .catch(() => {
        // Episode 2 bleibt auch ohne installierten Service Worker nutzbar.
      });
  }, []);

  const reloadForUpdate = useCallback(() => {
    if (updateReloadingRef.current) return;
    updateReloadingRef.current = true;
    window.localStorage.setItem("zeitreise-episode2-resume-after-update", "1");
    window.location.reload();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    let disposed = false;
    let checking = false;

    const checkForUpdate = async () => {
      if (checking || !window.navigator.onLine) return;
      checking = true;

      try {
        const response = await fetch(
          `/episode-2/?zeitreise-update=${Date.now()}`,
          { method: "HEAD", cache: "no-store" },
        );
        if (!response.ok || disposed) return;

        const serverModified = response.headers.get("last-modified") ?? "";
        const signature =
          response.headers.get("etag") ||
          serverModified ||
          response.headers.get("content-length") ||
          "";
        const knownSignature =
          window.localStorage.getItem("zeitreise-episode2-app-version") ?? "";
        const serverTime = Date.parse(serverModified);
        const pageTime = Date.parse(document.lastModified);
        const pageIsOlder =
          Number.isFinite(serverTime) &&
          Number.isFinite(pageTime) &&
          serverTime > pageTime + 1000;
        const versionChanged =
          Boolean(knownSignature) &&
          Boolean(signature) &&
          knownSignature !== signature;

        if (signature) {
          window.localStorage.setItem("zeitreise-episode2-app-version", signature);
        }

        const registration = await navigator.serviceWorker?.getRegistration();
        await registration?.update();

        if (!pageIsOlder && !versionChanged) return;
        if (isPlayingRef.current) {
          updateWaitingRef.current = true;
        } else {
          reloadForUpdate();
        }
      } catch {
        // Ohne Verbindung bleibt die bereits gespeicherte Episode nutzbar.
      } finally {
        checking = false;
      }
    };

    const checkWhenVisible = () => {
      if (document.visibilityState === "visible") void checkForUpdate();
    };

    void checkForUpdate();
    const timer = window.setInterval(checkForUpdate, 3 * 60 * 1000);
    window.addEventListener("focus", checkForUpdate);
    window.addEventListener("pageshow", checkForUpdate);
    document.addEventListener("visibilitychange", checkWhenVisible);

    return () => {
      disposed = true;
      window.clearInterval(timer);
      window.removeEventListener("focus", checkForUpdate);
      window.removeEventListener("pageshow", checkForUpdate);
      document.removeEventListener("visibilitychange", checkWhenVisible);
    };
  }, [reloadForUpdate]);

  useEffect(() => {
    if (!isPlaying && updateWaitingRef.current) reloadForUpdate();
  }, [isPlaying, reloadForUpdate]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }
    const sceneIds = [scene.id, episodeTwoScenes[currentIndex + 1]?.id].filter(
      (sceneId): sceneId is number => typeof sceneId === "number",
    );
    void navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "CACHE_SCENES",
        episode: 2,
        sceneIds,
      });
    });
  }, [currentIndex, scene.id]);

  useEffect(() => {
    if (!isPlaying || narrationPath) return;
    let frame = 0;
    let previous = window.performance.now();
    const tick = (now: number) => {
      const next = Math.min(
        1,
        progressRef.current + (now - previous) / (scene.duration * 1000),
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
  }, [isPlaying, narrationPath, scene.duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !narrationPath) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, narrationPath]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "BUTTON", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") goToScene(currentIndex - 1);
      if (event.key === "ArrowRight") {
        ensureAmbientSound();
        goToScene(currentIndex + 1, true);
      }
      if (event.key === " ") {
        event.preventDefault();
        if (progress >= 1) {
          progressRef.current = 0;
          setProgress(0);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }
        if (!isPlaying) ensureAmbientSound();
        setIsPlaying((value) => !value);
      }
      if (event.key === "Escape") setActiveHotspot(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, ensureAmbientSound, goToScene, isPlaying, progress]);

  const startJourney = () => {
    window.localStorage.setItem("zeitreise-episode2-intro-seen", "1");
    setIntroOpen(false);
    setAmbientMutedByUser(false);
    void activateAmbientSound().then((active) => {
      if (active) setAmbientEnabled(true);
    });
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (progress >= 1) {
      progressRef.current = 0;
      setProgress(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
    if (!isPlaying) ensureAmbientSound();
    setIsPlaying((value) => !value);
  };

  const toggleAmbient = () => {
    if (ambientEnabled) {
      setAmbientEnabled(false);
      setAmbientMutedByUser(true);
      return;
    }
    setAmbientMutedByUser(false);
    void activateAmbientSound().then((active) => {
      if (active) setAmbientEnabled(true);
    });
  };

  const answerQuiz = (index: number) => {
    setSelectedOption(index);
    setQuizChecked(true);
  };

  const seek = (value: number) => {
    const safe = Math.min(1, Math.max(0, value));
    progressRef.current = safe;
    setProgress(safe);
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = safe * audio.duration;
    }
  };

  return (
    <main className="app-shell ep2-shell">
      {introOpen ? (
        <section className="ep2-intro" role="dialog" aria-modal="true" aria-label="Beginn von Episode 2">
          <div className="ep2-intro-copy">
            <p className="eyebrow">Zeitreise · Episode 2</p>
            <span className="ep2-preview-badge">Arbeitsfassung · Handy-Test</span>
            <h2>Die Entwicklung des Menschen</h2>
            <strong>Eine verzweigte Geschichte</strong>
            <p>Die Reise geht beim kleinen Säugetier aus Episode 1 weiter.</p>
            <button type="button" onClick={startJourney}>Episode beginnen <span aria-hidden="true">→</span></button>
            <button className="ep2-intro-back" type="button" onClick={() => setIntroOpen(false)}>Direkt zur Übersicht</button>
          </div>
        </section>
      ) : null}

      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <p className="eyebrow">Episode 2</p>
            <span className="ep2-preview-badge">Arbeitsfassung · noch nicht vollständig</span>
            <h1>Zeitreise <span>Die Entwicklung des Menschen · Eine verzweigte Geschichte</span></h1>
          </div>
        </div>
        <div className="header-actions">
          <Link className="quiet-button ep2-episode-link" href="/">← Episode 1: Geschichte des Lebens</Link>
          <button className="quiet-button" type="button" onClick={() => setIntroOpen(true)}>Anfang ansehen</button>
        </div>
      </header>

      <EpisodeTwoTimeline scene={scene} onSelect={goToScene} />

      <div className="workspace">
        <section className="player-column">
          <div className="scene-heading">
            <div>
              <p className="eyebrow">Szene {twoDigits(scene.id)} von {episodeTwoScenes.length}</p>
              <h2>{scene.title}</h2>
            </div>
            <div className="scene-facts">
              <span>{scene.durationLabel}</span>
              <span>{scene.timeLabel}</span>
            </div>
          </div>

          <div
            className="scene-swipe-surface"
            onPointerDown={startSceneSwipe}
            onPointerUp={finishSceneSwipe}
            onPointerCancel={() => {
              swipeStartRef.current = null;
            }}
          >
            <EpisodeTwoVisual
              scene={scene}
              isPlaying={isPlaying}
              progress={progress}
            />
          </div>

          <audio
            ref={audioRef}
            src={narrationPath}
            preload="metadata"
            autoPlay={isPlaying}
            onCanPlay={(event) => {
              const audio = event.currentTarget;
              if (!isPlaying || !audio.paused) return;
              audio.play().catch(() => setIsPlaying(false));
            }}
            onTimeUpdate={(event) => {
              const audio = event.currentTarget;
              if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
              const next = Math.min(1, audio.currentTime / audio.duration);
              progressRef.current = next;
              setProgress(next);
            }}
            onEnded={() => {
              progressRef.current = 1;
              setProgress(1);
              setIsPlaying(false);
            }}
          />

          {activeHotspotData ? (
            <aside className="hotspot-popup" aria-live="polite">
              <div className="popup-number">{activeHotspot === null ? "" : activeHotspot + 1}</div>
              <div><p>{activeHotspotData.label}</p><h3>{activeHotspotData.title}</h3><span>{activeHotspotData.text}</span></div>
              <button type="button" onClick={() => setActiveHotspot(null)} aria-label="Hotspot schließen">×</button>
            </aside>
          ) : null}

          <div className="player-controls">
            <button className="round-control" type="button" onClick={() => goToScene(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Vorherige Szene">←</button>
            <button className={`play-control ${isPlaying ? "is-playing" : ""}`} type="button" onClick={togglePlayback}>
              <span className="play-orb" style={{ "--play-progress": `${progress * 100}%` } as React.CSSProperties} aria-hidden="true"><i /></span>
              <span className="play-label">{isPlaying ? "Pause" : progress >= 1 ? "Noch einmal" : "Szene starten"}</span>
              <span className="play-wave" aria-hidden="true"><i /><i /><i /></span>
            </button>
            {sceneUsesVideoSound ? (
              <span
                className="sound-control is-on ep2-mixed-sound"
                role="status"
                aria-label="Filmton und Sprecher sind zu einer Tonspur verbunden"
                title="Filmton und Sprecher laufen gemeinsam"
              >
                <span aria-hidden="true">◖))</span><span className="sound-label">Filmton</span>
              </span>
            ) : (
              <button className={`sound-control ${ambientEnabled ? "is-on" : ""}`} type="button" aria-pressed={ambientEnabled} onClick={toggleAmbient}>
                <span aria-hidden="true">{ambientEnabled ? "◖))" : "◖×"}</span><span className="sound-label">Atmosphäre</span>
              </button>
            )}
            <label className="scrubber"><span className="sr-only">Position in der Szene</span><input type="range" min="0" max="1000" value={Math.round(progress * 1000)} onChange={(event) => seek(Number(event.target.value) / 1000)} style={{ "--seek": `${progress * 100}%` } as React.CSSProperties} /></label>
            <span className="timecode">{formatTime(progress * scene.duration)} / {formatTime(scene.duration)}</span>
            <button className="next-control" type="button" onClick={() => { ensureAmbientSound(); goToScene(currentIndex + 1, true); }} disabled={currentIndex === episodeTwoScenes.length - 1}>Weiter <span aria-hidden="true">→</span></button>
          </div>
          <nav className="episode-series-nav" aria-label="Zwischen den Episoden wechseln">
            <Link className="episode-series-button" href="/">← Episode 1</Link>
            <button className="episode-series-button is-disabled" type="button" disabled aria-label="Episode 3 ist noch in Vorbereitung">Episode 3 →</button>
          </nav>
          <p className="keyboard-hint">Nach links wischen oder Pfeiltasten wechseln die Szene · Leertaste startet oder pausiert</p>
          <button className={`details-toggle ${detailsOpen ? "is-open" : ""}`} type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen} aria-controls="episode2-details"><span>{detailsOpen ? "Zusatzwissen schließen" : "Mehr entdecken"}</span><i aria-hidden="true">{detailsOpen ? "−" : "+"}</i></button>
        </section>

        <aside id="episode2-details" className={`content-panel ${detailsOpen ? "is-open" : ""}`}>
          <div className="panel-tabs" aria-label="Szeneninhalt">
            <button type="button" aria-pressed={panel === "sprecher"} className={panel === "sprecher" ? "is-active" : ""} onClick={() => setPanel("sprecher")}>Text lesen</button>
            <button type="button" aria-pressed={panel === "entdecken"} className={panel === "entdecken" ? "is-active" : ""} onClick={() => setPanel("entdecken")}>Entdecken</button>
            <button type="button" aria-pressed={panel === "quiz"} className={panel === "quiz" ? "is-active" : ""} onClick={() => setPanel("quiz")}>Quiz</button>
          </div>

          {panel === "sprecher" ? <section className="panel-section"><div className="ep2-audio-note"><span aria-hidden="true">◖))</span><p><strong>Sprecher: Micha</strong><small>Die Aufnahme ist mit dem Ablauf dieser Szene verbunden.</small></p></div><blockquote>{scene.speaker}</blockquote></section> : null}

          {panel === "entdecken" ? <section className="panel-section interactions">
            <div className="interaction-block ep2-hotspot-list"><div className="section-label"><span>Im Bild entdecken</span><i>2 Punkte</i></div>{scene.hotspots.map((hotspot, index) => <button type="button" onClick={() => setActiveHotspot(index)} key={hotspot.title}><span>{index + 1}</span><p><strong>{hotspot.title}</strong><small>{hotspot.text}</small></p></button>)}</div>
          </section> : null}

          {panel === "quiz" ? <section className="panel-section interactions">
            <div className="interaction-block quiz-panel">
              <div className="section-label"><span>Quiz zu dieser Szene</span></div>
              <h3>{scene.quiz.question}</h3>
              <div className="quiz-options">{scene.quiz.options.map((option, index) => { const selected = selectedOption === index; const correct = quizChecked && selected && index === scene.quiz.correctIndex; const wrong = quizChecked && selected && index !== scene.quiz.correctIndex; return <button type="button" className={`${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`} onClick={() => answerQuiz(index)} aria-pressed={selected} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</button>; })}</div>
              {quizChecked ? <div className={`quiz-result ${selectedOption === scene.quiz.correctIndex ? "is-correct" : "is-wrong"}`} role="status"><strong>{selectedOption === scene.quiz.correctIndex ? "Richtig." : "Noch nicht richtig."}</strong>{selectedOption !== scene.quiz.correctIndex ? <span>Versuch es einfach noch einmal.</span> : null}</div> : null}
            </div>
          </section> : null}
        </aside>
      </div>

      {currentIndex === episodeTwoScenes.length - 1 ? (
        <>
          <FinalEpisodeQuiz scenes={finalQuizScenes} episode={2} />

          <section className="ep3-outlook" aria-labelledby="episode-3-title">
            <p className="eyebrow">Die Zeitreise geht weiter · Episode 3</p>
            <h2 id="episode-3-title">Wie Menschen die Welt veränderten</h2>
            <strong>Von den ersten Siedlungen bis heute</strong>
            <p>
              Sesshaftigkeit, Landwirtschaft, Städte, Ideen und Technik verändern
              den Alltag – und schließlich den ganzen Planeten. Diese Episode ist
              noch in Vorbereitung.
            </p>
            <button type="button" disabled>Episode 3 · demnächst</button>
          </section>
        </>
      ) : null}

      <SiteFooter />
    </main>
  );
}
