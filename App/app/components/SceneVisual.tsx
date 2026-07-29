"use client";

import type { CSSProperties } from "react";
import type { Scene } from "../data/scenes";

type SceneVisualProps = {
  scene: Scene;
  isPlaying: boolean;
  progress: number;
  hasNarration: boolean;
  narrationVoiceName: string;
  activeHotspot: number | null;
  onHotspot: (index: number) => void;
  discoveryActive: boolean;
  discovered: number[];
  onDiscover: (index: number) => void;
};

const positions = [
  { left: "18%", top: "34%" },
  { left: "72%", top: "46%" },
  { left: "44%", top: "24%" },
  { left: "82%", top: "26%" },
  { left: "34%", top: "57%" },
];

const mediaStates: Partial<Record<number, string>> = {
  1: "Sternsystem → Feuerplanet → Vulkanküste",
  2: "Altbestand · Teilbestand",
  3: "Urmeerbild · Vorschau",
  4: "Lagunenbild · Vorschau",
  5: "Mikrowelt · Vorschau",
  6: "Zellwelt · Vorschau",
  7: "Stromatolithen · Vorschau",
  8: "Atmosphäre · Vorschau",
  9: "Endosymbiose · Vorschau",
  10: "Zellvielfalt · Vorschau",
  11: "Vielzeller · Vorschau",
  12: "Ediacara · Vorschau",
  13: "Kambrium · Vorschau",
  14: "Landpflanzen · Vorschau",
  15: "Landtiere · Vorschau",
  16: "Tiktaalik · Vorschau",
  17: "Amniotenei · Vorschau",
  18: "Dinosaurier · Vorschau",
  19: "Asteroid · Vorschau",
  20: "Neuanfang · Vorschau",
  21: "Säugetiere · Vorschau",
  22: "Zeitfelsen · Finale",
};

const generatedBackgrounds: Partial<Record<number, string>> = {
  12: "/assets/episode1/scene12/hintergrund-ediacara-v1.png",
  13: "/assets/episode1/scene13/hintergrund-kambrische-explosion-v1.png",
  14: "/assets/episode1/scene14/hintergrund-erste-landpflanzen-v1.png",
  15: "/assets/episode1/scene15/hintergrund-erste-landtiere-v1.png",
  16: "/assets/episode1/scene16/hintergrund-tiktaalik-v1.png",
  17: "/assets/episode1/scene17/hintergrund-amniotenei-v1.png",
  18: "/assets/episode1/scene18/hintergrund-dinosaurier-v1.png",
  19: "/assets/episode1/scene19/hintergrund-asteroid-morgen-v1.png",
  20: "/assets/episode1/scene20/hintergrund-nach-einschlag-v1.png",
  21: "/assets/episode1/scene21/hintergrund-saeugetiere-v1.png",
  22: "/assets/episode1/scene22/hintergrund-zeitfelsen-heute-v1.png",
};

const collectionOverlays: Partial<
  Record<number, { src: string; className: string }>
> = {
  14: {
    src: "/assets/episode1/scene14/overlay-nebel-v1.png",
    className: "collection-overlay-mist",
  },
  15: {
    src: "/assets/episode1/scene14/overlay-nebel-v1.png",
    className: "collection-overlay-mist collection-overlay-mist-coast",
  },
  16: {
    src: "/assets/episode1/scene16/overlay-wassersplash-v1.png",
    className: "collection-overlay-splash",
  },
  17: {
    src: "/assets/episode1/scene14/overlay-nebel-v1.png",
    className: "collection-overlay-mist collection-overlay-mist-swamp",
  },
  18: {
    src: "/assets/episode1/scene14/overlay-nebel-v1.png",
    className: "collection-overlay-mist collection-overlay-mist-dawn",
  },
  19: {
    src: "/assets/episode1/scene19/overlay-meteor-v1.png",
    className: "collection-overlay-meteor",
  },
  20: {
    src: "/assets/episode1/scene20/overlay-staubwolke-v1.png",
    className: "collection-overlay-dust",
  },
};

const subjectLabels: Record<Scene["theme"], string[]> = {
  volcanic: ["Vulkan", "Glutspalte"],
  rain: ["Wolken", "Wasserdampf"],
  ocean: ["Urmeer", "Sonnenstrahl"],
  lagoon: ["Flachwasser", "Energiequellen"],
  micro: ["Zelle", "Mineralpartikel"],
  oxygen: ["Zellverband", "Sauerstoffbläschen"],
  atmosphere: ["Atmosphäre", "Ozean"],
  ediacara: ["Weichkörper", "Meeresboden"],
  cambrian: ["Trilobit", "Anomalocaris"],
  shore: ["Landpflanzen", "feuchter Fels"],
  swamp: ["Tiktaalik", "Flachwasser"],
  egg: ["Amniotenei", "Sumpfwald"],
  dinosaurs: ["Pflanzenfresser", "Flusslandschaft"],
  impact: ["Lichtpunkt", "Herde"],
  ash: ["Zeitfelsen", "kleines Säugetier"],
  forest: ["Zeitfelsen", "kleines Säugetier"],
  present: ["Zeitfelsen", "Kinderhand"],
};

function cameraClasses(motions: string[]) {
  const classes = new Set<string>();
  const value = motions.join(" ");

  if (/zoom_hinein|vorwaertsfahrt|flug_zum_ufer/.test(value)) {
    classes.add("camera-zoom-in");
  }
  if (/zoom_heraus|fahrt_nach_oben/.test(value)) {
    classes.add("camera-zoom-out");
  }
  if (/schwenk_links|bodenfahrt/.test(value)) {
    classes.add("camera-pan-left");
  }
  if (/schwenk_entlang|kreisfahrt|folgen/.test(value)) {
    classes.add("camera-pan-right");
  }
  if (/sinkflug/.test(value)) {
    classes.add("camera-sink");
  }
  if (/schwebeflug|ueber_wasseroberflaeche|fahrt_ueber_meeresboden/.test(value)) {
    classes.add("camera-float");
  }

  return Array.from(classes).join(" ");
}

function motionClass(motion: string) {
  if (/regen/.test(motion)) return "motion-rain";
  if (/dampf|blasen|steigt|sauerstoff/.test(motion)) return "motion-rise";
  if (/rauch|nebel|aschewolken|staub_lichtet/.test(motion)) {
    return "motion-drift";
  }
  if (/wellen|brandung|stroemung/.test(motion)) return "motion-ripple";
  if (/glimm|glut|schimmer|sonnenlicht|lichtstrahlen/.test(motion)) {
    return "motion-glow";
  }
  if (/teilt|kolonie|zellverband|biofilm|zusammenarbeit/.test(motion)) {
    return "motion-grow";
  }
  if (/krabbelt|huscht|laeuft|kommt_hervor|folgt|bewegen_sich/.test(motion)) {
    return "motion-crawl";
  }
  if (/fliegt|schwirren|flug/.test(motion)) return "motion-fly";
  if (/zeitraffer|atmosphaere_gelblich_zu_blau/.test(motion)) {
    return "motion-shift";
  }
  if (/lichtblitz|organisches_schimmern_kurz/.test(motion)) {
    return "motion-flash";
  }
  if (/legt_eier|graebt|bedeckt|stuetzt|hebt_kopf|schnuppert|richtet_sich/.test(motion)) {
    return "motion-pulse";
  }
  return "motion-float";
}

function narrationParts(text: string) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

export function SceneVisual({
  scene,
  isPlaying,
  progress,
  hasNarration,
  narrationVoiceName,
  activeHotspot,
  onHotspot,
  discoveryActive,
  discovered,
  onDiscover,
}: SceneVisualProps) {
  const parts = narrationParts(scene.speaker);
  const partIndex = Math.min(
    parts.length - 1,
    Math.floor(progress * parts.length),
  );
  const nonCameraMotions = scene.motions.filter(
    (motion) => !motion.includes("kamera"),
  );
  const subjects = subjectLabels[scene.theme];
  const isSceneOne = scene.id === 1;
  const isSceneTwo = scene.id === 2;
  const isSceneThree = scene.id === 3;
  const isSceneFour = scene.id === 4;
  const isSceneFive = scene.id === 5;
  const isSceneSix = scene.id === 6;
  const isSceneSeven = scene.id === 7;
  const isSceneEight = scene.id === 8;
  const isSceneNine = scene.id === 9;
  const isSceneTen = scene.id === 10;
  const isSceneEleven = scene.id === 11;
  const generatedBackground = generatedBackgrounds[scene.id];
  const collectionOverlay = collectionOverlays[scene.id];
  const recoveredMediaState = mediaStates[scene.id];
  const hasRecoveredMedia = Boolean(recoveredMediaState);
  const impactFlash =
    scene.id === 19 && progress >= 0.56 && progress < 0.585;
  const impactBlackout =
    scene.id === 19 && progress >= 0.585 && progress < 0.63;
  const showEnding = scene.id === 22 && progress >= 0.72;
  const sceneOneCosmosOpacity = Math.min(
    1,
    Math.max(0, 1 - (progress - 0.24) / 0.12),
  );
  const sceneOnePlanetOpacity =
    Math.min(1, Math.max(0, (progress - 0.16) / 0.1)) *
    Math.min(1, Math.max(0, 1 - (progress - 0.5) / 0.12));
  const sceneOneSurfaceOpacity = Math.min(
    1,
    Math.max(0, (progress - 0.5) / 0.12),
  );
  const sceneTwoRainOpacity = Math.min(
    0.8,
    Math.max(0.08, (progress - 0.18) / 0.55),
  );
  const sceneTwoHeatOpacity = Math.max(0.18, 1 - progress * 0.82);

  return (
    <section
      className={[
        "scene-visual",
        `theme-${scene.theme}`,
        isSceneOne && "has-scene-one-media",
        isSceneTwo && "has-scene-two-media",
        isSceneThree && "has-scene-three-media",
        isSceneFour && "has-scene-four-media",
        isSceneFive && "has-scene-five-media",
        isSceneSix && "has-scene-six-media",
        isSceneSeven && "has-scene-seven-media",
        isSceneEight && "has-scene-eight-media",
        isSceneNine && "has-scene-nine-media",
        isSceneTen && "has-scene-ten-media",
        isSceneEleven && "has-scene-eleven-media",
        generatedBackground && "has-scene-generated-media",
        isPlaying ? "is-playing" : "is-paused",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isSceneOne
          ? ({
              "--scene-one-cosmos-opacity": sceneOneCosmosOpacity,
              "--scene-one-planet-opacity": sceneOnePlanetOpacity,
              "--scene-one-surface-opacity": sceneOneSurfaceOpacity,
            } as CSSProperties)
          : isSceneTwo
            ? ({
                "--scene-two-rain-opacity": sceneTwoRainOpacity,
                "--scene-two-heat-opacity": sceneTwoHeatOpacity,
              } as CSSProperties)
          : undefined
      }
      aria-label={`Technische Bildvorschau für Szene ${scene.id}: ${scene.title}`}
    >
      <div className="stage-topline">
        {scene.timeLabel ? (
          <span className="time-card">{scene.timeLabel}</span>
        ) : <span aria-hidden="true" />}
        <span className={`media-state ${hasRecoveredMedia ? "is-ready" : ""}`}>
          <span className="state-dot" aria-hidden="true" />
          {hasRecoveredMedia ? recoveredMediaState : "Medienplatzhalter"}
        </span>
      </div>

      <div className={`world-camera ${cameraClasses(scene.motions)}`}>
        {isSceneOne ? (
          <div className="scene-one-media" aria-hidden="true">
            <img
              className="scene-one-background scene-one-cosmos"
              src="/assets/episode1/scene01/hintergrund-sternsystem-v1.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-one-background scene-one-planet"
              src="/assets/episode1/scene01/hintergrund-feuerplanet-v1.png"
              alt=""
              draggable={false}
            />
            <div className="scene-one-surface">
              <img
                className="scene-one-surface-background"
                src="/assets/episode1/scene01/hintergrund-vulkanische-kueste-neu-v1.png"
                alt=""
                draggable={false}
              />
              <img
                className="scene-one-layer scene-one-glutspalten"
                src="/assets/episode1/scene01/overlay-glutspalten.png"
                alt=""
                draggable={false}
              />
              <img
                className="scene-one-layer scene-one-lavafontaene"
                src="/assets/episode1/scene01/overlay-lavafontaene.png"
                alt=""
                draggable={false}
              />
              <img
                className="scene-one-layer scene-one-dampf"
                src="/assets/episode1/scene01/overlay-dampf.png"
                alt=""
                draggable={false}
              />
              <img
                className="scene-one-layer scene-one-rauch"
                src="/assets/episode1/scene01/overlay-rauch.png"
                alt=""
                draggable={false}
              />
              <img
                className="scene-one-layer scene-one-asche"
                src="/assets/episode1/scene01/overlay-asche-funken.png"
                alt=""
                draggable={false}
              />
            </div>
          </div>
        ) : null}
        {isSceneTwo ? (
          <div className="scene-two-media" aria-hidden="true">
            <img
              className="scene-two-background"
              src="/assets/episode1/scene02/hintergrund-vulkanische-kueste.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-two-layer scene-two-lavafluss"
              src="/assets/episode1/scene02/overlay-lavafluss.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-two-layer scene-two-dampf-rauch"
              src="/assets/episode1/scene02/overlay-dampf-rauch.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-two-layer scene-two-dampf"
              src="/assets/episode1/scene02/overlay-dampf.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-two-layer scene-two-regen"
              src="/assets/episode1/scene02/overlay-regen.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneThree ? (
          <div className="scene-three-media" aria-hidden="true">
            <img
              className="scene-three-background"
              src="/assets/episode1/scene03/hintergrund-urmeer-v1.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-three-layer scene-three-dampf"
              src="/assets/episode1/scene03/overlay-dampf.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-three-layer scene-three-regen"
              src="/assets/episode1/scene03/overlay-regen.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneFour ? (
          <div className="scene-four-media" aria-hidden="true">
            <img
              className="scene-four-background"
              src="/assets/episode1/scene04/hintergrund-ursuppe-lagune-v1.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-four-layer scene-four-dampf"
              src="/assets/episode1/scene04/overlay-dampf.png"
              alt=""
              draggable={false}
            />
            <img
              className="scene-four-layer scene-four-hitzeflimmern"
              src="/assets/episode1/scene04/overlay-hitzeflimmern.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneFive ? (
          <div className="scene-five-media" aria-hidden="true">
            <img
              className="scene-five-background"
              src="/assets/episode1/scene05/hintergrund-erste-zelle-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneSix ? (
          <div className="scene-six-media" aria-hidden="true">
            <img
              className="scene-six-background"
              src="/assets/episode1/scene06/hintergrund-ausbreitung-leben-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneSeven ? (
          <div className="scene-seven-media" aria-hidden="true">
            <img
              className="scene-seven-background"
              src="/assets/episode1/scene07/hintergrund-cyanobakterien-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneEight ? (
          <div className="scene-eight-media" aria-hidden="true">
            <img
              className="scene-eight-background"
              src="/assets/episode1/scene08/hintergrund-sauerstoffwende-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneNine ? (
          <div className="scene-nine-media" aria-hidden="true">
            <img
              className="scene-nine-background"
              src="/assets/episode1/scene09/hintergrund-endosymbiose-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneTen ? (
          <div className="scene-ten-media" aria-hidden="true">
            <img
              className="scene-ten-background"
              src="/assets/episode1/scene10/hintergrund-komplexe-einzeller-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {isSceneEleven ? (
          <div className="scene-eleven-media" aria-hidden="true">
            <img
              className="scene-eleven-background"
              src="/assets/episode1/scene11/hintergrund-erste-vielzeller-v1.png"
              alt=""
              draggable={false}
            />
          </div>
        ) : null}
        {generatedBackground ? (
          <div
            className={`scene-generated-media scene-generated-${scene.id}`}
            aria-hidden="true"
          >
            <img
              className="scene-generated-background"
              src={generatedBackground}
              alt=""
              draggable={false}
            />
            {collectionOverlay ? (
              <img
                className={`collection-overlay ${collectionOverlay.className}`}
                src={collectionOverlay.src}
                alt=""
                draggable={false}
              />
            ) : null}
          </div>
        ) : null}
        {!isSceneOne ? (
          <>
            <div className="world-sun" aria-hidden="true" />
            <div className="world-haze" aria-hidden="true" />
            <div className="world-horizon" aria-hidden="true" />
            <div className="world-water" aria-hidden="true" />
            <div className="world-ground" aria-hidden="true" />
            <div className="world-rock" aria-hidden="true" />
            <div className="world-hand" aria-hidden="true" />
          </>
        ) : null}

        {subjects.map((label, index) => (
          <div
            className={`world-subject subject-${index + 1}`}
            key={label}
            aria-hidden="true"
          >
            <span>{label}</span>
          </div>
        ))}

        {nonCameraMotions.map((motion, index) => (
          <span
            className={`motion-token ${motionClass(motion)}`}
            key={motion}
            title={motion}
            style={
              {
                "--motion-index": index,
                "--motion-left": `${12 + ((index * 17) % 76)}%`,
                "--motion-top": `${18 + ((index * 23) % 58)}%`,
              } as CSSProperties
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {showEnding ? (
        <div className="ending-title" aria-live="polite">
          <span>Zeitreise</span>
          <strong>Die Geschichte des Lebens</strong>
          <small>Episode 2 „Das Zeitalter der Giganten“</small>
        </div>
      ) : null}

      {scene.id === 19 && progress >= 0.48 && progress < 0.52 ? (
        <div className="silence-card">Absolute Stille · 2 Sekunden</div>
      ) : null}
      <div
        className={`impact-flash ${impactFlash ? "is-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`impact-blackout ${impactBlackout ? "is-visible" : ""}`}
        aria-hidden="true"
      />

      <div className="hotspot-layer" aria-label="Hotspots">
        {scene.hotspots.map((hotspot, index) => (
          <button
            type="button"
            className={`hotspot-marker ${activeHotspot === index ? "is-active" : ""}`}
            style={positions[index]}
            onClick={() => onHotspot(index)}
            aria-label={`Hotspot ${index + 1}: ${hotspot.label}`}
            aria-pressed={activeHotspot === index}
            key={hotspot.label}
          >
            <span aria-hidden="true">+</span>
            <small>{hotspot.label}</small>
          </button>
        ))}
      </div>

      {discoveryActive && scene.discovery ? (
        <div className="discovery-layer" aria-label={scene.discovery.label}>
          {scene.discovery.items.map((item, index) => {
            const isFound = discovered.includes(index);
            return (
              <button
                type="button"
                className={`discovery-marker ${isFound ? "is-found" : ""}`}
                style={positions[(index + 2) % positions.length]}
                onClick={() => onDiscover(index)}
                aria-label={
                  isFound ? `${item} – entdeckt` : `Unbekannten Fund markieren`
                }
                key={item}
              >
                <span aria-hidden="true">{isFound ? "✓" : "·"}</span>
                {isFound ? <small>{item}</small> : null}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="subtitle" aria-live="polite">
        <span>
          {hasNarration
            ? `Sprechertext · KI-Stimme ${narrationVoiceName}`
            : `Sprechertext · ${narrationVoiceName}-Aufnahme ausstehend`}
        </span>
        <p>{parts[partIndex]}</p>
      </div>
    </section>
  );
}
