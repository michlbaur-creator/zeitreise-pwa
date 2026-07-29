"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAmbientSound } from "./audio/useAmbientSound";
import { SceneVisual } from "./components/SceneVisual";
import { narrationTracks, narrationVoice } from "./data/narration";
import { scenes, totalDuration } from "./data/scenes";

type Panel = "sprecher" | "interaktion" | "produktion";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function twoDigits(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(seconds: number) {
  const safe = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function loadStoredNumber(key: string, fallback: number) {
  try {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function loadStoredRecord(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as Record<string, number[]>) : {};
  } catch {
    return {};
  }
}

function loadStoredNumbers(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as number[]) : [];
  } catch {
    return [];
  }
}

export default function ZeitreiseApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState<Panel>("sprecher");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [correctScenes, setCorrectScenes] = useState<number[]>([]);
  const [discoveryActive, setDiscoveryActive] = useState(false);
  const [discoveredByScene, setDiscoveredByScene] = useState<
    Record<string, number[]>
  >({});
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const progressRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scene = scenes[currentIndex];
  const narrationPath = narrationTracks[scene.id];
  const discovered = discoveredByScene[String(scene.id)] ?? [];
  const activeHotspotData =
    activeHotspot === null ? null : scene.hotspots[activeHotspot];

  useAmbientSound(scene.theme, isPlaying, ambientEnabled);

  const quizCount = useMemo(
    () => scenes.filter((entry) => entry.quiz).length,
    [],
  );

  const goToScene = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= scenes.length) return;
      audioRef.current?.pause();
      setCurrentIndex(nextIndex);
      setIsPlaying(false);
      setProgress(0);
      progressRef.current = 0;
      setActiveHotspot(null);
      setSelectedOption(null);
      setQuizChecked(false);
      setDiscoveryActive(false);
      window.localStorage.setItem("zeitreise-current-scene", String(nextIndex));
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    window.queueMicrotask(() => {
      if (cancelled) return;
      const storedIndex = loadStoredNumber("zeitreise-current-scene", 0);
      setCurrentIndex(
        Math.min(scenes.length - 1, Math.max(0, Math.floor(storedIndex))),
      );
      setCorrectScenes(loadStoredNumbers("zeitreise-correct-scenes"));
      setDiscoveredByScene(loadStoredRecord("zeitreise-discoveries"));
      setIsOnline(window.navigator.onLine);
      setIsReady(true);
    });

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("beforeinstallprompt", onInstallPrompt);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Die lokale Vorschau funktioniert auch ohne installierten Service Worker.
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!isPlaying || narrationPath) return;

    let frame = 0;
    let previous = window.performance.now();

    const tick = (now: number) => {
      const delta = (now - previous) / (scene.duration * 1000);
      previous = now;
      const next = Math.min(1, progressRef.current + delta);
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
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        ["INPUT", "BUTTON", "TEXTAREA", "SELECT"].includes(target.tagName)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        goToScene(Math.min(scenes.length - 1, currentIndex + 1));
      }
      if (event.key === "ArrowLeft") {
        goToScene(Math.max(0, currentIndex - 1));
      }
      if (event.key === " ") {
        event.preventDefault();
        if (progress >= 1) {
          setProgress(0);
          progressRef.current = 0;
          if (audioRef.current) audioRef.current.currentTime = 0;
        }
        setIsPlaying((value) => !value);
      }
      if (event.key === "Escape") {
        setActiveHotspot(null);
        setDiscoveryActive(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [currentIndex, goToScene, progress]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(
      "zeitreise-correct-scenes",
      JSON.stringify(correctScenes),
    );
  }, [correctScenes, isReady]);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(
      "zeitreise-discoveries",
      JSON.stringify(discoveredByScene),
    );
  }, [discoveredByScene, isReady]);

  const togglePlayback = () => {
    if (progress >= 1) {
      setProgress(0);
      progressRef.current = 0;
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
    setIsPlaying((value) => !value);
  };

  const seek = (next: number) => {
    const safe = Math.min(1, Math.max(0, next));
    progressRef.current = safe;
    setProgress(safe);
    const audio = audioRef.current;
    if (
      narrationPath &&
      audio &&
      Number.isFinite(audio.duration) &&
      audio.duration > 0
    ) {
      audio.currentTime = safe * audio.duration;
    }
  };

  const checkQuiz = () => {
    if (selectedOption === null || !scene.quiz) return;
    setQuizChecked(true);
    if (
      selectedOption === scene.quiz.correctIndex &&
      !correctScenes.includes(scene.id)
    ) {
      setCorrectScenes((values) => [...values, scene.id]);
    }
  };

  const discover = (index: number) => {
    const key = String(scene.id);
    setDiscoveredByScene((current) => {
      const existing = current[key] ?? [];
      if (existing.includes(index)) return current;
      return { ...current, [key]: [...existing, index] };
    });
  };

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span />
          </div>
          <div>
            <p className="eyebrow">Episode 1 · Technische Vorschau</p>
            <h1>
              Zeitreise <span>Die Geschichte des Lebens</span>
            </h1>
          </div>
        </div>
        <div className="header-actions">
          <span className="local-badge">Nur lokal</span>
          <span className="voice-badge">KI-Stimme {narrationVoice.displayName}</span>
          {installPrompt ? (
            <button className="quiet-button" type="button" onClick={install}>
              App installieren
            </button>
          ) : null}
        </div>
      </header>

      <section className="episode-overview" aria-label="Episodenübersicht">
        <div>
          <p>Von der jungen Erde bis heute</p>
          <span>
            22 Szenen · rund {formatTime(totalDuration)} Minuten · finale Texte
            unverändert
          </span>
        </div>
        <div className="episode-progress">
          <span>{correctScenes.length} Quizfragen beantwortet</span>
          <div
            className="episode-progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={quizCount}
            aria-valuenow={correctScenes.length}
            aria-label="Beantwortete Quizfragen"
          >
            <i
              style={{
                width: `${(correctScenes.length / quizCount) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <nav className="scene-timeline" aria-label="Alle 22 Szenen">
        <div className="timeline-line" aria-hidden="true" />
        {scenes.map((entry, index) => (
          <button
            type="button"
            className={`timeline-stop ${index === currentIndex ? "is-current" : ""} ${correctScenes.includes(entry.id) ? "is-complete" : ""}`}
            onClick={() => goToScene(index)}
            aria-current={index === currentIndex ? "step" : undefined}
            aria-label={`Szene ${entry.id}: ${entry.title}`}
            title={entry.title}
            key={entry.id}
          >
            <span>{twoDigits(entry.id)}</span>
          </button>
        ))}
      </nav>

      <div className="workspace">
        <section className="player-column">
          <div className="scene-heading">
            <div>
              <p className="eyebrow">
                Szene {twoDigits(scene.id)} von {scenes.length}
              </p>
              <h2>{scene.title}</h2>
            </div>
            <div className="scene-facts">
              <span>{scene.durationLabel}</span>
              <span>{scene.motions.length} Bewegungen</span>
            </div>
          </div>

          <SceneVisual
            scene={scene}
            isPlaying={isPlaying}
            progress={progress}
            hasNarration={Boolean(narrationPath)}
            narrationVoiceName={narrationVoice.displayName}
            activeHotspot={activeHotspot}
            onHotspot={(index) =>
              setActiveHotspot((value) => (value === index ? null : index))
            }
            discoveryActive={discoveryActive}
            discovered={discovered}
            onDiscover={discover}
          />

          {narrationPath ? (
            <audio
              key={scene.id}
              ref={audioRef}
              src={narrationPath}
              preload="metadata"
              onTimeUpdate={(event) => {
                const audio = event.currentTarget;
                if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
                  return;
                }
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
          ) : null}

          {activeHotspotData ? (
            <aside className="hotspot-popup" aria-live="polite">
              <div className="popup-number">
                {activeHotspot !== null ? activeHotspot + 1 : ""}
              </div>
              <div>
                <p>{activeHotspotData.label}</p>
                {activeHotspotData.title ? (
                  <h3>{activeHotspotData.title}</h3>
                ) : null}
                <span>{activeHotspotData.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                aria-label="Hotspot schließen"
              >
                ×
              </button>
            </aside>
          ) : null}

          <div className="player-controls">
            <button
              className="round-control"
              type="button"
              onClick={() => goToScene(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Vorherige Szene"
            >
              ←
            </button>
            <button
              className="play-control"
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Szene pausieren" : "Szene abspielen"}
            >
              <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
              {isPlaying ? "Pause" : progress >= 1 ? "Neu starten" : "Abspielen"}
            </button>
            <button
              className={`sound-control ${ambientEnabled ? "is-on" : ""}`}
              type="button"
              aria-pressed={ambientEnabled}
              onClick={() => setAmbientEnabled((value) => !value)}
              title="Leise Hintergrundatmosphäre ein- oder ausschalten"
            >
              <span aria-hidden="true">{ambientEnabled ? "◖))" : "◖×"}</span>
              Atmosphäre
            </button>
            <label className="scrubber">
              <span className="sr-only">Position in der Szene</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={Math.round(progress * 1000)}
                onChange={(event) => seek(Number(event.target.value) / 1000)}
                style={
                  {
                    "--seek": `${progress * 100}%`,
                  } as React.CSSProperties
                }
              />
            </label>
            <span className="timecode">
              {formatTime(progress * scene.duration)} /{" "}
              {formatTime(scene.duration)}
            </span>
            <button
              className="round-control"
              type="button"
              onClick={() => goToScene(currentIndex + 1)}
              disabled={currentIndex === scenes.length - 1}
              aria-label="Nächste Szene"
            >
              →
            </button>
          </div>
          <p className="keyboard-hint">
            Pfeiltasten wechseln die Szene · Leertaste startet oder pausiert
          </p>
        </section>

        <aside className="content-panel">
          <div className="panel-tabs" role="tablist" aria-label="Szeneninhalt">
            <button
              type="button"
              role="tab"
              aria-selected={panel === "sprecher"}
              className={panel === "sprecher" ? "is-active" : ""}
              onClick={() => setPanel("sprecher")}
            >
              Sprechertext
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={panel === "interaktion"}
              className={panel === "interaktion" ? "is-active" : ""}
              onClick={() => setPanel("interaktion")}
            >
              Interaktion
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={panel === "produktion"}
              className={panel === "produktion" ? "is-active" : ""}
              onClick={() => setPanel("produktion")}
            >
              Regie & Medien
            </button>
          </div>

          {panel === "sprecher" ? (
            <section className="panel-section" role="tabpanel">
              <div className="section-label">
                <span>Sprechertext – final</span>
                <i>unverändert</i>
              </div>
              <blockquote>{scene.speaker}</blockquote>
              <div className={`missing-note ${narrationPath ? "is-ready" : ""}`}>
                <span aria-hidden="true">{narrationPath ? "●" : "○"}</span>
                <div>
                  <strong>
                    {narrationPath
                      ? `KI-Sprecheraufnahme ${narrationVoice.displayName} vorhanden`
                      : `KI-Stimme ${narrationVoice.displayName} ausgewählt`}
                  </strong>
                  <p>
                    {narrationPath
                      ? "Diese Szene wird mit einer KI-generierten Stimme gesprochen."
                      : "Die Stimme ist verbindlich festgelegt; die Audiodatei dieser Szene steht noch aus."}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {panel === "interaktion" ? (
            <section className="panel-section interactions" role="tabpanel">
              {scene.hotspots.length ? (
                <div className="interaction-block">
                  <div className="section-label">
                    <span>Hotspots</span>
                    <i>{scene.hotspots.length}</i>
                  </div>
                  <div className="hotspot-list">
                    {scene.hotspots.map((hotspot, index) => (
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(index)}
                        key={hotspot.label}
                      >
                        <span>{index + 1}</span>
                        <div>
                          <strong>{hotspot.label}</strong>
                          {hotspot.title ? <small>{hotspot.title}</small> : null}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {scene.discovery ? (
                <div className="interaction-block discovery-panel">
                  <div className="section-label">
                    <span>{scene.discovery.label}</span>
                    <i>
                      {discovered.length}/{scene.discovery.items.length}
                    </i>
                  </div>
                  <h3>{scene.discovery.prompt}</h3>
                  {scene.discovery.note ? <p>{scene.discovery.note}</p> : null}
                  <button
                    type="button"
                    className="discover-toggle"
                    onClick={() => setDiscoveryActive((value) => !value)}
                  >
                    {discoveryActive ? "Suche beenden" : "Im Bild entdecken"}
                  </button>
                  <ul>
                    {scene.discovery.items.map((item, index) => (
                      <li
                        className={
                          discovered.includes(index) ? "is-found" : ""
                        }
                        key={item}
                      >
                        <span aria-hidden="true">
                          {discovered.includes(index) ? "✓" : "·"}
                        </span>
                        {discovered.includes(index)
                          ? item
                          : "Noch nicht entdeckt"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {scene.quiz ? (
                <div className="interaction-block quiz-panel">
                  <div className="section-label">
                    <span>Quiz</span>
                    {correctScenes.includes(scene.id) ? (
                      <i className="correct-label">beantwortet</i>
                    ) : null}
                  </div>
                  <h3>{scene.quiz.question}</h3>
                  <div className="quiz-options">
                    {scene.quiz.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect =
                        quizChecked && index === scene.quiz?.correctIndex;
                      const isWrong =
                        quizChecked &&
                        isSelected &&
                        index !== scene.quiz?.correctIndex;
                      return (
                        <button
                          type="button"
                          className={`${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                          onClick={() => {
                            if (!quizChecked) setSelectedOption(index);
                          }}
                          aria-pressed={isSelected}
                          key={option}
                        >
                          <span>{String.fromCharCode(65 + index)}</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked ? (
                    <div
                      className={`quiz-result ${
                        selectedOption === scene.quiz.correctIndex
                          ? "is-correct"
                          : "is-wrong"
                      }`}
                      role="status"
                    >
                      <strong>
                        {selectedOption === scene.quiz.correctIndex
                          ? "Richtig."
                          : "Noch nicht richtig."}
                      </strong>
                      {selectedOption !== scene.quiz.correctIndex ? (
                        <button
                          type="button"
                          onClick={() => setQuizChecked(false)}
                        >
                          Antwort ändern
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="check-answer"
                      disabled={selectedOption === null}
                      onClick={checkQuiz}
                    >
                      Antwort prüfen
                    </button>
                  )}
                </div>
              ) : null}

              {!scene.hotspots.length && !scene.discovery && !scene.quiz ? (
                <div className="empty-interaction">
                  <span>Keine Interaktion festgelegt</span>
                  <p>
                    Für diese Szene enthält die verbindliche Fassung weder
                    Hotspot noch Quiz oder Entdeckerauftrag.
                  </p>
                </div>
              ) : null}
            </section>
          ) : null}

          {panel === "produktion" ? (
            <section className="panel-section production" role="tabpanel">
              {scene.directorNote ? (
                <div className="director-note">
                  <span>Verbindliche Regieentscheidung</span>
                  <p>{scene.directorNote}</p>
                </div>
              ) : null}

              <dl className="production-facts">
                <div>
                  <dt>Sprecherstimme</dt>
                  <dd>
                    {narrationVoice.provider} {narrationVoice.displayName} ·{" "}
                    {narrationVoice.disclosure} · {narrationVoice.direction}
                  </dd>
                </div>
                <div>
                  <dt>Bildinhalt</dt>
                  <dd>{scene.setting}</dd>
                </div>
                <div>
                  <dt>Kamera</dt>
                  <dd>{scene.camera}</dd>
                </div>
                {scene.mediaNote ? (
                  <div>
                    <dt>Besondere Animation / Hinweis</dt>
                    <dd>{scene.mediaNote}</dd>
                  </div>
                ) : null}
                {scene.transition ? (
                  <div>
                    <dt>Übergang</dt>
                    <dd>{scene.transition}</dd>
                  </div>
                ) : null}
              </dl>

              <details open>
                <summary>
                  Geplante Bilder und Ebenen <span>{scene.media.length}</span>
                </summary>
                <p className="asset-status">
                  Noch keine dieser Dateien liegt im Projekt vor.
                </p>
                <ul className="asset-list">
                  {scene.media.map((asset) => (
                    <li key={asset}>{asset}</li>
                  ))}
                </ul>
              </details>

              <details>
                <summary>
                  Bewegungen in der App <span>{scene.motions.length}</span>
                </summary>
                <p className="asset-status">
                  Diese Einträge laufen als ruhige Bewegungen in der Vorschau,
                  nicht als einzelne Mediendateien.
                </p>
                <ul className="asset-list">
                  {scene.motions.map((motion) => (
                    <li key={motion}>{motion}</li>
                  ))}
                </ul>
              </details>

              <details>
                <summary>
                  Geplante Geräusche <span>{scene.sounds.length}</span>
                </summary>
                <p className="asset-status">
                  Noch keine Audiodatei liegt im Projekt vor. Musik:{" "}
                  {scene.music}.
                </p>
                <ul className="asset-list">
                  {scene.sounds.map((sound) => (
                    <li key={sound}>{sound}</li>
                  ))}
                </ul>
              </details>
            </section>
          ) : null}
        </aside>
      </div>

      <footer className="app-footer">
        <div>
          <span className={`connection-dot ${isOnline ? "" : "is-offline"}`} />
          {isOnline
            ? "Lokale Vorschau bereit · nach dem ersten Laden auch ohne Verbindung nutzbar"
            : "Offline-Modus aktiv"}
        </div>
        <p>
          Inhaltliche Grundlage: Muster-Episode V1.0 · Sprecherstimme
          KI-generiert ({narrationVoice.provider} {narrationVoice.displayName})
        </p>
      </footer>
    </main>
  );
}
