"use client";

import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAmbientSound } from "./audio/useAmbientSound";
import { FinalEpisodeQuiz } from "./components/FinalEpisodeQuiz";
import { SceneVisual } from "./components/SceneVisual";
import { SiteFooter } from "./components/SiteFooter";
import {
  narrationTracks,
  narrationVoiceForScene,
} from "./data/narration";
import { followUpQuizzes, scenes } from "./data/scenes";

type Panel = "sprecher" | "interaktion";

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

const earthMilestones = [
  {
    sceneId: 1,
    label: "Erde entsteht",
    age: "4,6 Mrd.",
    symbol: "◎",
    color: "#e08a38",
  },
  {
    sceneId: 3,
    label: "Erste Ozeane",
    age: "4,4 Mrd.",
    symbol: "≋",
    color: "#43b8d0",
  },
  {
    sceneId: 5,
    label: "Erstes Leben",
    age: "3,5 Mrd.",
    symbol: "✧",
    color: "#9bc94a",
  },
  {
    sceneId: 8,
    label: "Sauerstoff",
    age: "2,4 Mrd.",
    symbol: "O₂",
    color: "#6fbcd3",
  },
  {
    sceneId: 18,
    label: "Dinosaurier",
    age: "230 Mio.",
    symbol: "◇",
    color: "#d96251",
  },
  {
    sceneId: 21,
    label: "Säugetiere",
    age: "66 Mio.",
    symbol: "●",
    color: "#c78a4e",
  },
  {
    sceneId: 22,
    label: "Heute",
    age: "Jetzt",
    symbol: "✦",
    color: "#e0ad54",
  },
] as const;

const finalQuizSceneIds = new Set([1, 3, 5, 8, 11, 14, 17, 19, 21]);
const finalQuizScenes = scenes.filter((scene) =>
  finalQuizSceneIds.has(scene.id),
);

const familyTreeSceneLinks: Record<
  number,
  { label: string; group: string }
> = {
  12: { label: "Tierstammbaum", group: "tierreich" },
  13: { label: "Frühe Tierlinien", group: "nesseltiere" },
  15: { label: "Gliederfüßer", group: "gliederfuesser" },
  16: { label: "Fische & Amphibien", group: "amphibien" },
  17: { label: "Nabeltiere", group: "amnioten" },
  18: { label: "Reptilien & Vögel", group: "reptilien" },
  21: { label: "Säugetiere", group: "saeugetiere" },
};

function EarthTimeline({
  sceneId,
  timeLabel,
  onSelect,
}: {
  sceneId: number;
  timeLabel?: string;
  onSelect: (sceneIndex: number) => void;
}) {
  let activeMilestone = 0;

  earthMilestones.forEach((milestone, index) => {
    if (sceneId >= milestone.sceneId) activeMilestone = index;
  });

  const travelled =
    earthMilestones.length > 1
      ? (activeMilestone / (earthMilestones.length - 1)) * 100
      : 0;
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeMilestone]);

  return (
    <nav className="earth-timeline" aria-label="Navigation durch die Erdgeschichte">
      <div className="earth-timeline-current">
        <span>Du bist hier</span>
        <strong>{timeLabel ?? earthMilestones[activeMilestone].age}</strong>
      </div>
      <div className="earth-timeline-scroll">
        <div className="earth-timeline-track" aria-hidden="true">
          <span style={{ width: `${travelled}%` }} />
        </div>
        <div className="earth-timeline-stops">
          {earthMilestones.map((milestone, index) => (
            <button
              type="button"
              className={index === activeMilestone ? "is-current" : ""}
              style={
                {
                  "--milestone-color": milestone.color,
                } as React.CSSProperties
              }
              onClick={() => onSelect(milestone.sceneId - 1)}
              aria-current={index === activeMilestone ? "step" : undefined}
              aria-label={`${milestone.label}, ${milestone.age}`}
              ref={index === activeMilestone ? activeButtonRef : undefined}
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

function loadStoredSceneIndex() {
  try {
    const value = Number(
      window.localStorage.getItem("zeitreise-current-scene") ?? "0",
    );
    return Number.isInteger(value) && value >= 0 && value < scenes.length
      ? value
      : 0;
  } catch {
    return 0;
  }
}

export default function ZeitreiseApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState<Panel>("interaktion");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [introClosing, setIntroClosing] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [correctScenes, setCorrectScenes] = useState<number[]>([]);
  const [discoveryActive, setDiscoveryActive] = useState(false);
  const [discoveredByScene, setDiscoveredByScene] = useState<
    Record<string, number[]>
  >({});
  const [installPrompt, setInstallPrompt] =
    useState<InstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
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

  const scene = scenes[currentIndex];
  const sceneQuizzes = scene.quiz
    ? [scene.quiz, followUpQuizzes[scene.id]].filter(Boolean)
    : [];
  const activeQuiz = sceneQuizzes[quizQuestionIndex];
  const narrationPath = narrationTracks[scene.id];
  const activeNarrationVoice = narrationVoiceForScene(scene.id);
  const narrationDisplayName =
    scene.id <= 14
      ? activeNarrationVoice.displayName
      : `KI-Stimme ${activeNarrationVoice.displayName}`;
  const discovered = discoveredByScene[String(scene.id)] ?? [];
  const activeHotspotData =
    activeHotspot === null ? null : scene.hotspots[activeHotspot];
  const familyTreeLink = familyTreeSceneLinks[scene.id];

  const activateAmbientSound = useAmbientSound(
    scene.id,
    scene.theme,
    isPlaying,
    ambientEnabled,
  );

  useEffect(() => {
    if (!introOpen) return;
    const timer = window.setTimeout(() => setIntroReady(true), 14800);
    return () => window.clearTimeout(timer);
  }, [introOpen]);

  useEffect(() => {
    document.body.classList.toggle("cinematic-intro-active", introOpen);
    return () => document.body.classList.remove("cinematic-intro-active");
  }, [introOpen]);

  const goToScene = useCallback(
    (nextIndex: number, playImmediately = false) => {
      if (nextIndex < 0 || nextIndex >= scenes.length) return;
      audioRef.current?.pause();
      setCurrentIndex(nextIndex);
      setIsPlaying(playImmediately);
      setProgress(0);
      progressRef.current = 0;
      setActiveHotspot(null);
      setSelectedOption(null);
      setQuizChecked(false);
      setQuizQuestionIndex(0);
      setDiscoveryActive(false);
      window.localStorage.setItem("zeitreise-current-scene", String(nextIndex));
    },
    [],
  );

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
        target?.closest(
          "button, a, input, textarea, select, [role='slider']",
        )
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
        target?.closest(
          "button, a, input, textarea, select, [role='slider']",
        )
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
        goToScene(currentIndex + 1, true);
      } else {
        goToScene(currentIndex - 1);
      }
    },
    [currentIndex, goToScene],
  );

  useEffect(() => {
    let cancelled = false;

    window.queueMicrotask(() => {
      if (cancelled) return;
      setCurrentIndex(loadStoredSceneIndex());
      setCorrectScenes(loadStoredNumbers("zeitreise-correct-scenes"));
      setDiscoveredByScene(loadStoredRecord("zeitreise-discoveries"));
      const continueJourney =
        new URLSearchParams(window.location.search).get("weiter") === "1";
      if (
        continueJourney ||
        window.localStorage.getItem("zeitreise-resume-after-update") === "1"
      ) {
        window.localStorage.removeItem("zeitreise-resume-after-update");
        setIntroOpen(false);
      }
      if (continueJourney) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      setIsReady(true);
    });

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);

    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "development") {
        void navigator.serviceWorker
          .getRegistrations()
          .then(async (registrations) => {
            await Promise.all(
              registrations.map((registration) => registration.unregister()),
            );

            if ("caches" in window) {
              const cacheNames = await window.caches.keys();
              await Promise.all(
                cacheNames
                  .filter((name) => name.startsWith("zeitreise-"))
                  .map((name) => window.caches.delete(name)),
              );
            }

            const reloadKey = "zeitreise-local-cache-cleared";
            if (
              !cancelled &&
              navigator.serviceWorker.controller &&
              window.sessionStorage.getItem(reloadKey) !== "1"
            ) {
              window.sessionStorage.setItem(reloadKey, "1");
              window.location.reload();
            }
          })
          .catch(() => {
            // Die lokale Vorschau bleibt auch ohne Bereinigung nutzbar.
          });
      } else {
        navigator.serviceWorker
          .register("/sw.js", { updateViaCache: "none" })
          .catch(() => {
            // Die App funktioniert auch ohne installierten Service Worker.
          });
      }
    }

    return () => {
      cancelled = true;
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
    };
  }, []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const reloadForUpdate = useCallback(() => {
    if (updateReloadingRef.current) return;
    updateReloadingRef.current = true;
    window.localStorage.setItem("zeitreise-resume-after-update", "1");
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
        const response = await fetch(`/?zeitreise-update=${Date.now()}`, {
          method: "HEAD",
          cache: "no-store",
        });
        if (!response.ok || disposed) return;

        const serverModified = response.headers.get("last-modified") ?? "";
        const signature =
          response.headers.get("etag") ||
          serverModified ||
          response.headers.get("content-length") ||
          "";
        const knownSignature =
          window.localStorage.getItem("zeitreise-app-version") ?? "";
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
          window.localStorage.setItem("zeitreise-app-version", signature);
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
        // Ohne Verbindung bleibt die bereits gespeicherte App vollständig nutzbar.
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
        goToScene(
          Math.min(scenes.length - 1, currentIndex + 1),
          currentIndex < scenes.length - 1,
        );
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

  useEffect(() => {
    if (
      !quizChecked ||
      selectedOption !== activeQuiz?.correctIndex ||
      quizQuestionIndex >= sceneQuizzes.length - 1
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setQuizQuestionIndex((value) => value + 1);
      setSelectedOption(null);
      setQuizChecked(false);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [
    activeQuiz?.correctIndex,
    quizChecked,
    quizQuestionIndex,
    sceneQuizzes.length,
    selectedOption,
  ]);

  const togglePlayback = () => {
    if (progress >= 1) {
      setProgress(0);
      progressRef.current = 0;
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
    setIsPlaying((value) => !value);
  };

  const toggleAmbientSound = () => {
    if (ambientEnabled) {
      setAmbientEnabled(false);
      return;
    }

    void activateAmbientSound().then((activated) => {
      if (activated) setAmbientEnabled(true);
    });
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

  const answerQuiz = (optionIndex: number) => {
    if (!activeQuiz || selectedOption === activeQuiz.correctIndex) return;
    setSelectedOption(optionIndex);
    setQuizChecked(true);
    if (
      optionIndex === activeQuiz.correctIndex &&
      quizQuestionIndex === sceneQuizzes.length - 1 &&
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

  const startJourney = () => {
    goToScene(0);
    setIntroClosing(true);
    void activateAmbientSound().then((activated) => {
      if (activated) setAmbientEnabled(true);
    });
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
    window.setTimeout(() => {
      setIntroOpen(false);
      setIntroClosing(false);
    }, 1520);
  };

  const replayIntro = () => {
    audioRef.current?.pause();
    goToScene(0);
    setIntroReady(false);
    setIntroClosing(false);
    setIntroOpen(true);
  };

  return (
    <main className="app-shell">
      {introOpen ? (
        <section
          className={`cinematic-intro ${introReady ? "is-ready" : ""} ${introClosing ? "is-leaving" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Der Beginn der Zeitreise"
        >
          <div className="intro-image intro-stars" aria-hidden="true" />
          <div className="intro-image intro-planet" aria-hidden="true" />
          <div className="intro-image intro-surface" aria-hidden="true" />
          <div className="intro-shade" aria-hidden="true" />

          <div className="intro-title">
            <span>Episode 1</span>
            <h2>Zeitreise</h2>
            <p>Die Geschichte des Lebens</p>
          </div>

          <div className="intro-story" aria-live="polite">
            <p>Wir verlassen unsere Zeit.</p>
            <strong>Unsere Reise beginnt vor 4,6 Milliarden Jahren.</strong>
          </div>

          <div className="intro-time-machine" aria-hidden="true">
            <div className="intro-time-labels">
              <span>Heute</span>
              <span>500 Mio.</span>
              <span>1 Mrd.</span>
              <span>3 Mrd.</span>
              <span>4,6 Mrd.</span>
            </div>
            <div className="intro-time-rail">
              <i />
            </div>
          </div>

          <div className="intro-entry">
            {introReady ? (
              <button type="button" onClick={startJourney}>
                Reise beginnen
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <span>Die Zeitmaschine fährt hoch …</span>
            )}
          </div>
        </section>
      ) : null}

      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span />
          </div>
          <div>
            <p className="eyebrow">Episode 1</p>
            <h1>
              Zeitreise <span>Die Geschichte des Lebens</span>
            </h1>
          </div>
        </div>
        <div className="header-actions">
          <button className="quiet-button intro-replay" type="button" onClick={replayIntro}>
            Anfang ansehen
          </button>
          {installPrompt ? (
            <button className="quiet-button" type="button" onClick={install}>
              App installieren
            </button>
          ) : null}
        </div>
      </header>

      <EarthTimeline
        sceneId={scene.id}
        timeLabel={scene.timeLabel}
        onSelect={goToScene}
      />

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
              <span>{scene.timeLabel}</span>
              {familyTreeLink ? (
                <Link
                  className="scene-tree-link"
                  href={`/tierstammbaum/#${familyTreeLink.group}`}
                >
                  {familyTreeLink.label}{" "}
                  <i className="external-link-icon" aria-hidden="true" />
                </Link>
              ) : null}
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
            <SceneVisual
              scene={scene}
              isPlaying={isPlaying}
              progress={progress}
              hasNarration={Boolean(narrationPath)}
              narrationVoiceName={narrationDisplayName}
              activeHotspot={activeHotspot}
              onHotspot={(index) =>
                setActiveHotspot((value) => (value === index ? null : index))
              }
              discoveryActive={discoveryActive}
              discovered={discovered}
              onDiscover={discover}
            />
          </div>

          {narrationPath ? (
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
              className={`play-control ${isPlaying ? "is-playing" : ""} ${progress >= 1 ? "is-replay" : ""}`}
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Szene pausieren" : "Szene abspielen"}
            >
              <span
                className="play-orb"
                style={
                  {
                    "--play-progress": `${progress * 100}%`,
                  } as React.CSSProperties
                }
                aria-hidden="true"
              >
                <i />
              </span>
              <span className="play-label">
                {isPlaying
                  ? "Pause"
                  : progress >= 1
                    ? "Noch einmal"
                    : "Szene starten"}
              </span>
              <span className="play-wave" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
            <button
              className={`sound-control ${ambientEnabled ? "is-on" : ""}`}
              type="button"
              aria-pressed={ambientEnabled}
              aria-label={`Hintergrundatmosphäre ${
                ambientEnabled ? "ausschalten" : "einschalten"
              }`}
              onClick={toggleAmbientSound}
              title={
                ambientEnabled
                  ? "Hintergrundatmosphäre ausschalten"
                  : "Hintergrundatmosphäre einschalten"
              }
            >
              <span aria-hidden="true">{ambientEnabled ? "◖))" : "◖×"}</span>
              <span className="sound-label">Atmosphäre</span>
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
              className="next-control"
              type="button"
              onClick={() => goToScene(currentIndex + 1, true)}
              disabled={currentIndex === scenes.length - 1}
              aria-label="Nächste Szene"
            >
              Weiter <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="keyboard-hint">
            Wischen oder Pfeiltasten wechseln die Szene · Leertaste startet
            oder pausiert
          </p>
          <button
            className={`details-toggle ${detailsOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => setDetailsOpen((value) => !value)}
            aria-expanded={detailsOpen}
            aria-controls="scene-details"
          >
            <span>{detailsOpen ? "Zusatzwissen schließen" : "Mehr entdecken"}</span>
            <i aria-hidden="true">{detailsOpen ? "−" : "+"}</i>
          </button>
        </section>

        <aside
          id="scene-details"
          className={`content-panel ${detailsOpen ? "is-open" : ""}`}
        >
          <div className="panel-tabs" aria-label="Szeneninhalt">
            <button
              type="button"
              aria-pressed={panel === "sprecher"}
              className={panel === "sprecher" ? "is-active" : ""}
              onClick={() => setPanel("sprecher")}
            >
              Text lesen
            </button>
            <button
              type="button"
              aria-pressed={panel === "interaktion"}
              className={panel === "interaktion" ? "is-active" : ""}
              onClick={() => setPanel("interaktion")}
            >
              Entdecken &amp; Quiz
            </button>
            <Link
              className="panel-tree-nav"
              href={`/tierstammbaum/#${familyTreeLink?.group ?? "tierreich"}`}
            >
              Tierstammbaum &amp; Stationen{" "}
              <i className="external-link-icon" aria-hidden="true" />
            </Link>
          </div>

          {panel === "sprecher" ? (
            <section className="panel-section">
              <blockquote>{scene.speaker}</blockquote>
            </section>
          ) : null}

          {panel === "interaktion" ? (
            <section className="panel-section interactions">
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
                        <div>
                          <strong>
                            {discovered.includes(index)
                              ? item
                              : "Noch nicht entdeckt"}
                          </strong>
                          {discovered.includes(index) &&
                          scene.discovery?.explanations?.[index] ? (
                            <small>
                              {scene.discovery.explanations[index]}
                            </small>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {activeQuiz ? (
                <div className="interaction-block quiz-panel">
                  <div className="section-label">
                    <span>
                      Quiz · Frage {quizQuestionIndex + 1} von {sceneQuizzes.length}
                    </span>
                    {correctScenes.includes(scene.id) ? (
                      <i className="correct-label">beantwortet</i>
                    ) : null}
                  </div>
                  <h3>{activeQuiz.question}</h3>
                  <div className="quiz-options">
                    {activeQuiz.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect =
                        quizChecked &&
                        isSelected &&
                        index === activeQuiz.correctIndex;
                      const isWrong =
                        quizChecked &&
                        isSelected &&
                        index !== activeQuiz.correctIndex;
                      return (
                        <button
                          type="button"
                          className={`${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                          onClick={() => answerQuiz(index)}
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
                        selectedOption === activeQuiz.correctIndex
                          ? "is-correct"
                          : "is-wrong"
                      }`}
                      role="status"
                    >
                      <strong>
                        {selectedOption === activeQuiz.correctIndex
                          ? "Richtig."
                          : "Noch nicht richtig."}
                      </strong>
                      {selectedOption !== activeQuiz.correctIndex ? (
                        <span>Versuch es einfach noch einmal.</span>
                      ) : quizQuestionIndex < sceneQuizzes.length - 1 ? (
                        <span>Die nächste Frage kommt sofort.</span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {!scene.discovery && !scene.quiz ? (
                <div className="empty-interaction">
                  <span>Kein Zusatzinhalt vorgesehen</span>
                  <p>
                    Die anklickbaren Punkte findest du direkt im Bild. Für
                    diese Szene ist kein zusätzliches Quiz vorgesehen.
                  </p>
                </div>
              ) : null}
            </section>
          ) : null}

        </aside>
      </div>

      {scene.id === scenes.length && progress >= 0.995 ? (
        <FinalEpisodeQuiz scenes={finalQuizScenes} />
      ) : null}

      <SiteFooter />
    </main>
  );
}
