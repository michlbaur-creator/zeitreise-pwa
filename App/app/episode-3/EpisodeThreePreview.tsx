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
import { useAmbientSound } from "../audio/useAmbientSound";
import { EpisodeSeriesNav } from "../components/EpisodeSeriesNav";
import { FinalEpisodeQuiz } from "../components/FinalEpisodeQuiz";
import { SiteFooter } from "../components/SiteFooter";
import { TimeZoomMark, TimeZoomTransition } from "../components/TimeZoom";
import {
  type EpisodeThreeScene,
  episodeThreeSceneAudio,
  episodeThreeSceneDurations,
  episodeThreeSceneVideos,
  episodeThreeScenes,
} from "../data/episode3";
import { episodeThreePart } from "../data/episode3Parts";
import type { SceneTheme } from "../data/scenes";
import { EpisodeThreePartOverview } from "./EpisodeThreePartGuide";
import { EpisodeThreeVisual } from "./EpisodeThreeVisual";

type Panel = "sprecher" | "entdecken" | "quiz";

const sceneSymbols = [
  "↶", "⌁", "◇", "⌂", "≋", "♑", "◎", "▦", "⚖",
  "▤", "⚒", "✎", "◉", "◫", "◆",
];

const episodeThreeFinalQuizScenes = episodeThreeScenes.flatMap((scene) =>
  scene.quiz.map((quiz) => ({
    id: scene.id,
    title: scene.title,
    quiz: {
      question: quiz.question,
      options: [...quiz.answers],
      correctIndex: quiz.correctAnswer,
    },
  })),
);

const episodeThreePartOneQuizScenes = episodeThreeFinalQuizScenes.filter(
  (scene) => scene.id <= 9,
);
const episodeThreePartTwoQuizScenes = episodeThreeFinalQuizScenes.filter(
  (scene) => scene.id >= 10,
);
const episodeThreePartOne = episodeThreePart(1);

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function themeForScene(sceneId: number): SceneTheme {
  if (sceneId === 1) return "shore";
  if (sceneId === 4) return "atmosphere";
  if (sceneId >= 8) return "present";
  return "forest";
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
        <TimeZoomMark level={3} progress={travelled / 100} />
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
  const [sceneDuration, setSceneDuration] = useState<number>(episodeThreeSceneDurations[1]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
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

  const scene = episodeThreeScenes[currentIndex];
  const partTwoActive = scene.id >= 10;
  const activeQuiz = scene.quiz[quizQuestionIndex];
  const sceneHasVideo = scene.id in episodeThreeSceneVideos;
  const scenePlaybackRate = scene.id === 9 ? 1.2 : 1;
  const narrationPath = episodeThreeSceneAudio[
    scene.id as keyof typeof episodeThreeSceneAudio
  ];
  const activateAmbientSound = useAmbientSound(
    200 + scene.id,
    themeForScene(scene.id),
    isPlaying,
    ambientEnabled && !sceneHasVideo,
    progress,
  );

  const ensureAmbientSound = useCallback(() => {
    if (ambientMutedByUser) return;
    void activateAmbientSound().then((active) => {
      if (active) setAmbientEnabled(true);
    });
  }, [activateAmbientSound, ambientMutedByUser]);

  const goToScene = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= episodeThreeScenes.length) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentIndex(nextIndex);
    const nextSceneId = episodeThreeScenes[nextIndex].id as keyof typeof episodeThreeSceneDurations;
    setSceneDuration(episodeThreeSceneDurations[nextSceneId]);
    setProgress(0);
    progressRef.current = 0;
    setIsPlaying(true);
    setSelectedOption(null);
    setQuizChecked(false);
    setQuizQuestionIndex(0);
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
      const resumeAfterUpdate =
        window.localStorage.getItem("zeitreise-episode3-resume-after-update") === "1";
      if (resumeAfterUpdate) {
        window.localStorage.removeItem("zeitreise-episode3-resume-after-update");
      }
      if (
        Number.isInteger(storedIndex) &&
        storedIndex >= 0 &&
        storedIndex < episodeThreeScenes.length
      ) {
        setCurrentIndex(storedIndex);
      }
      setIntroOpen(!introSeen && !resumeAfterUpdate);
      setIsPlaying(false);
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
    if (
      !quizChecked ||
      selectedOption !== activeQuiz.correctAnswer ||
      quizQuestionIndex >= scene.quiz.length - 1
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setQuizQuestionIndex((value) => value + 1);
      setSelectedOption(null);
      setQuizChecked(false);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [activeQuiz.correctAnswer, quizChecked, quizQuestionIndex, scene.quiz.length, selectedOption]);

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
    if (process.env.NODE_ENV === "development" || !("serviceWorker" in navigator)) {
      return;
    }
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .catch(() => undefined);
  }, []);

  const reloadForUpdate = useCallback(() => {
    if (updateReloadingRef.current) return;
    updateReloadingRef.current = true;
    window.localStorage.setItem("zeitreise-episode3-resume-after-update", "1");
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
          `/episode-3/?zeitreise-update=${Date.now()}`,
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
          window.localStorage.getItem("zeitreise-episode3-app-version") ?? "";
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
          window.localStorage.setItem("zeitreise-episode3-app-version", signature);
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
        return;
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
      if (event.key === "ArrowRight") {
        ensureAmbientSound();
        goToScene(currentIndex + 1);
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
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, ensureAmbientSound, goToScene, isPlaying, progress]);

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
    setAmbientMutedByUser(false);
    void activateAmbientSound().then((active) => {
      if (active) setAmbientEnabled(true);
    });
    setCurrentIndex(0);
    setSceneDuration(episodeThreeSceneDurations[1]);
    setProgress(0);
    progressRef.current = 0;
    if (audioRef.current) audioRef.current.currentTime = 0;
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

  const seek = (value: number) => {
    const safe = Math.min(1, Math.max(0, value));
    progressRef.current = safe;
    setProgress(safe);
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = safe * audio.duration;
    }
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
            <p className="eyebrow">Zeitreise · Episode 3 · Teil 1 von 4</p>
            <h2>{episodeThreePartOne.title}</h2>
            <strong>{episodeThreePartOne.guidingQuestion}</strong>
            <p>Die Reise geht in der Welt vor ungefähr 14.000 Jahren weiter.</p>
            <TimeZoomTransition
              level={3}
              progress={0}
              caption="Diese rund 14.000 Jahre belegen auf der großen Erdzeituhr nur etwa 0,13 Sekunden. Für Episode 3 machen wir daraus ein breites Zeitband von 12.000 v. Chr. bis heute."
            />
            <button type="button" onClick={startJourney}>Episode beginnen <span aria-hidden="true">→</span></button>
            <EpisodeThreePartOverview activePart={1} />
            <button className="ep2-intro-back" type="button" onClick={startJourney}>Direkt zur ersten Szene</button>
          </div>
        </section>
      ) : null}

      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /></div>
          <div>
            <p className="eyebrow">Episode 3</p>
            <h1>Zeitreise <span>{partTwoActive ? "Städte, Schrift und Macht" : "Vom Wandern zum Bleiben"}</span></h1>
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
              progress={progress}
            />
          </div>

          <audio
            ref={audioRef}
            src={narrationPath}
            preload="metadata"
            autoPlay={isPlaying}
            onLoadedMetadata={(event) => {
              const audio = event.currentTarget;
              audio.playbackRate = scenePlaybackRate;
              audio.preservesPitch = true;
              if (Number.isFinite(audio.duration) && audio.duration > 0) {
                setSceneDuration(audio.duration / scenePlaybackRate);
              }
            }}
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

          <div className="player-controls">
            <button className="round-control" type="button" onClick={() => goToScene(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Vorherige Szene">←</button>
            <button className={`play-control ${isPlaying ? "is-playing" : ""}`} type="button" onClick={togglePlayback}>
              <span className="play-orb" style={{ "--play-progress": `${progress * 100}%` } as CSSProperties} aria-hidden="true"><i /></span>
              <span className="play-label">{isPlaying ? "Pause" : progress >= 1 ? "Noch einmal" : "Szene starten"}</span>
              <span className="play-wave" aria-hidden="true"><i /><i /><i /></span>
            </button>
            {sceneHasVideo ? (
              <span className="sound-control is-on ep2-mixed-sound" role="status" aria-label="Filmton und Sprecher sind zu einer Tonspur verbunden">
                <span aria-hidden="true">◖))</span><span className="sound-label">Filmton</span>
              </span>
            ) : (
              <button className={`sound-control ${ambientEnabled ? "is-on" : ""}`} type="button" aria-pressed={ambientEnabled} onClick={toggleAmbient}>
                <span aria-hidden="true">{ambientEnabled ? "◖))" : "◖×"}</span><span className="sound-label">Atmosphäre</span>
              </button>
            )}
            <label className="scrubber"><span className="sr-only">Position in der Szene</span><input type="range" min="0" max="1000" value={Math.round(progress * 1000)} onChange={(event) => seek(Number(event.target.value) / 1000)} style={{ "--seek": `${progress * 100}%` } as CSSProperties} /></label>
            <span className="timecode">{formatTime(progress * sceneDuration)} / {formatTime(sceneDuration)}</span>
            <button className="next-control" type="button" onClick={() => { ensureAmbientSound(); goToScene(currentIndex + 1); }} disabled={currentIndex === episodeThreeScenes.length - 1}>Weiter <span aria-hidden="true">→</span></button>
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
              <div className="ep2-audio-note">
                <span aria-hidden="true">◖))</span>
                <p>
                  <strong>{partTwoActive ? "Vorläufige Vorschau-Stimme" : "Sprecher: Micha"}</strong>
                  <small>
                    {partTwoActive
                      ? "Michas endgültige Aufnahme steht für diese Szene noch aus."
                      : "Die Aufnahme ist mit dem Ablauf dieser Szene verbunden."}
                  </small>
                </p>
              </div>
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
                <div className="section-label"><span>Quiz · Frage {quizQuestionIndex + 1} von {scene.quiz.length}</span></div>
                <h3>{activeQuiz.question}</h3>
                <div className="quiz-options">
                  {activeQuiz.answers.map((answer, index) => {
                    const selected = selectedOption === index;
                    const correct = quizChecked && selected && index === activeQuiz.correctAnswer;
                    const wrong = quizChecked && selected && index !== activeQuiz.correctAnswer;
                    return (
                      <button type="button" className={`${selected ? "is-selected" : ""} ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`} onClick={() => answerQuiz(index)} aria-pressed={selected} key={answer}>
                        <span>{String.fromCharCode(65 + index)}</span>{answer}
                      </button>
                    );
                  })}
                </div>
                {quizChecked ? (
                  <div className={`quiz-result ${selectedOption === activeQuiz.correctAnswer ? "is-correct" : "is-wrong"}`} role="status">
                    <strong>{selectedOption === activeQuiz.correctAnswer ? "Richtig." : "Noch nicht richtig."}</strong>
                    {selectedOption !== activeQuiz.correctAnswer ? (
                      <span>Versuch es einfach noch einmal.</span>
                    ) : quizQuestionIndex < scene.quiz.length - 1 ? (
                      <span>Die nächste Frage kommt sofort.</span>
                    ) : (
                      <span>Beide Fragen geschafft.</span>
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      {scene.id === 9 ? (
        <FinalEpisodeQuiz
          scenes={episodeThreePartOneQuizScenes}
          episode={3}
          questionCount={5}
          randomize
        />
      ) : null}

      {scene.id === 15 ? (
        <FinalEpisodeQuiz
          scenes={episodeThreePartTwoQuizScenes}
          episode={3}
          episodePart={2}
          questionCount={5}
          randomize
          celebratePerfect
        />
      ) : null}

      <SiteFooter />
    </main>
  );
}
