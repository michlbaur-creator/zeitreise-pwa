"use client";

import type { CSSProperties } from "react";
import {
  SCENE_THIRTEEN_ARMS_RACE_START,
  SCENE_THIRTEEN_DIVERSITY_START,
  SCENE_THIRTEEN_FEATURES_START,
  SCENE_THIRTEEN_PREDATOR_PREY_START,
  SCENE_THIRTEEN_TRANSITION_START,
} from "../data/cambrianTiming";
import {
  SCENE_TEN_DIVERSE_BEHAVIOR,
  SCENE_TEN_GENERATIONS,
  SCENE_TEN_SEA_FILLS,
  SCENE_TEN_SELECTION,
  SCENE_TEN_VARIANTS,
} from "../data/complexCellTiming";
import { captionTracks } from "../data/captions";
import {
  SCENE_NINETEEN_BLACKOUT_END,
  SCENE_NINETEEN_FLASH_END,
  SCENE_NINETEEN_IMPACT,
  SCENE_NINETEEN_METEOR_START,
  SCENE_NINETEEN_SILENCE_START,
} from "../data/impactTiming";
import {
  SCENE_EIGHT_ADAPTATION,
  SCENE_EIGHT_ATMOSPHERE_CHANGE,
  SCENE_EIGHT_MICRO_TRANSITION,
  SCENE_EIGHT_OCEAN_REACTION,
  SCENE_EIGHT_TOXIC_EFFECT,
  SCENE_SEVEN_BUBBLES_BUILD,
  SCENE_SEVEN_FOLLOW_BUBBLE,
  SCENE_SEVEN_NEW_INGREDIENT,
  SCENE_SEVEN_PHOTOSYNTHESIS_START,
  SCENE_SEVEN_SURFACE_CHANGE,
} from "../data/oxygenTiming";
import { rainIntensityForScene } from "../data/rainTiming";
import type { Scene } from "../data/scenes";
import {
  SCENE_TWENTY_MAMMAL_EMERGES,
  SCENE_TWENTY_MAMMAL_HIDDEN,
  SCENE_TWENTY_MAMMAL_RETREATS,
} from "../data/survivorTiming";
import {
  SCENE_SIXTEEN_CROAK,
  SCENE_SIXTEEN_HEAD_LIFT_START,
  SCENE_SIXTEEN_PUSH_START,
  SCENE_SIXTEEN_SECOND_PUSH,
  SCENE_SIXTEEN_SUPPORT_START,
} from "../data/tiktaalikTiming";

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

type CollectionOverlay = {
  src: string;
  className: string;
};

const collectionOverlays: Partial<Record<number, CollectionOverlay[]>> = {
  14: [
    {
      src: "/assets/episode1/scene14/overlay-nebel-v1.png",
      className: "collection-overlay-mist",
    },
  ],
  15: [
    {
      src: "/assets/episode1/scene14/overlay-nebel-v1.png",
      className: "collection-overlay-mist collection-overlay-mist-coast",
    },
  ],
  17: [
    {
      src: "/assets/episode1/scene14/overlay-nebel-v1.png",
      className: "collection-overlay-mist collection-overlay-mist-swamp",
    },
  ],
  18: [
    {
      src: "/assets/episode1/scene14/overlay-nebel-v1.png",
      className: "collection-overlay-mist collection-overlay-mist-dawn",
    },
    {
      src: "/assets/episode1/scene18/overlay-wolkenschatten-v1.png",
      className: "collection-overlay-shadow",
    },
  ],
};

const atmosphereProfiles: Partial<
  Record<number, { className: string; particles: number }>
> = {
  3: { className: "atmosphere-ocean-light", particles: 5 },
  4: { className: "atmosphere-lagoon-bubbles", particles: 8 },
  5: { className: "atmosphere-first-cell", particles: 4 },
  11: { className: "atmosphere-cell-team", particles: 8 },
  12: { className: "atmosphere-seafloor-drift", particles: 6 },
  14: { className: "atmosphere-land-spores", particles: 14 },
  15: { className: "atmosphere-land-crawlers", particles: 5 },
  16: { className: "atmosphere-swamp-life", particles: 6 },
  17: { className: "atmosphere-egg-and-insects", particles: 6 },
  18: { className: "atmosphere-dinosaur-scale", particles: 3 },
  21: { className: "atmosphere-forest-life", particles: 10 },
  22: { className: "atmosphere-present-life", particles: 10 },
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

function phaseProgress(progress: number, start: number, end: number) {
  const value = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return value * value * (3 - 2 * value);
}

function binaryCellPath(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  pinch: number,
) {
  const left = centerX - width / 2;
  const right = centerX + width / 2;
  const top = centerY - height / 2;
  const bottom = centerY + height / 2;

  return [
    `M ${left + 72} ${top}`,
    `C ${left + 26} ${top} ${left} ${centerY - 48} ${left} ${centerY}`,
    `C ${left} ${centerY + 48} ${left + 26} ${bottom} ${left + 72} ${bottom}`,
    `L ${centerX - 88} ${bottom}`,
    `C ${centerX - 48} ${bottom} ${centerX - 28} ${bottom - pinch} ${centerX} ${bottom - pinch}`,
    `C ${centerX + 28} ${bottom - pinch} ${centerX + 48} ${bottom} ${centerX + 88} ${bottom}`,
    `L ${right - 72} ${bottom}`,
    `C ${right - 26} ${bottom} ${right} ${centerY + 48} ${right} ${centerY}`,
    `C ${right} ${centerY - 48} ${right - 26} ${top} ${right - 72} ${top}`,
    `L ${centerX + 88} ${top}`,
    `C ${centerX + 48} ${top} ${centerX + 28} ${top + pinch} ${centerX} ${top + pinch}`,
    `C ${centerX - 28} ${top + pinch} ${centerX - 48} ${top} ${centerX - 88} ${top}`,
    "Z",
  ].join(" ");
}

function BinaryFissionAnimation({ progress }: { progress: number }) {
  const replicate = phaseProgress(progress, 0.04, 0.24);
  const elongate = phaseProgress(progress, 0.18, 0.43);
  const constrict = phaseProgress(progress, 0.4, 0.68);
  const separate = phaseProgress(progress, 0.64, 0.8);
  const multiply = phaseProgress(progress, 0.78, 0.98);
  const cellWidth = 275 + elongate * 165;
  const dnaDistance = 14 + replicate * 28 + elongate * 70;
  const mainCellOpacity = 1 - separate;
  const daughterOpacity = separate * (1 - multiply * 0.82);
  const colonyOpacity = multiply;
  const daughterDistance = 120 + separate * 96;
  const phaseLabel =
    progress < 0.24
      ? "Die Erbinformation wird kopiert"
      : progress < 0.44
        ? "Die Kopien wandern auseinander"
        : progress < 0.69
          ? "Die Zellmembran schnürt sich ein"
          : progress < 0.82
            ? "Zwei Tochterzellen entstehen"
            : "Aus zwei werden vier – das Leben breitet sich aus";

  const colonyCells = [
    { x: 295, y: 246, rotation: -8 },
    { x: 430, y: 354, rotation: 7 },
    { x: 570, y: 245, rotation: 6 },
    { x: 705, y: 354, rotation: -7 },
  ];

  return (
    <div
      className="binary-fission-story"
      role="img"
      aria-label="Animation der Zellteilung: Die Zelle kopiert ihre Erbinformation, zieht beide Kopien auseinander, schnürt sich ein und bildet zwei Tochterzellen."
    >
      <span className="binary-fission-phase">{phaseLabel}</span>
      <svg
        className="binary-fission-svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="fission-cytoplasm" cx="42%" cy="34%" r="75%">
            <stop offset="0%" stopColor="#d6d5a5" stopOpacity="0.55" />
            <stop offset="52%" stopColor="#719f78" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#244e48" stopOpacity="0.35" />
          </radialGradient>
          <linearGradient id="fission-membrane" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfddb0" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#9bc49b" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#5c8a77" stopOpacity="0.84" />
          </linearGradient>
          <filter id="fission-glow" x="-40%" y="-60%" width="180%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <g id="fission-dna">
            <path
              d="M-32 0 C-27 -27 18 -31 31 -7 C44 17 5 34 -22 20 C-43 9 -38 -13 -19 -18 C2 -24 23 -7 19 11"
              fill="none"
              stroke="#f1d176"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-8" cy="-3" r="35" fill="#e5cf72" opacity="0.07" />
          </g>
          <g id="fission-daughter-cell">
            <ellipse
              rx="106"
              ry="78"
              fill="url(#fission-cytoplasm)"
              stroke="url(#fission-membrane)"
              strokeWidth="6"
            />
            <ellipse
              rx="88"
              ry="62"
              fill="none"
              stroke="#eef0c8"
              strokeOpacity="0.17"
              strokeWidth="2"
              strokeDasharray="5 11"
            />
            <g className="binary-dna" transform="scale(.78)">
              <use href="#fission-dna" />
            </g>
            <circle cx="-61" cy="-29" r="7" fill="#d4d8a3" opacity="0.28" />
            <circle cx="58" cy="28" r="9" fill="#acd09e" opacity="0.23" />
          </g>
        </defs>

        <g className="binary-main-cell" opacity={mainCellOpacity}>
          <path
            className="binary-cell-halo"
            d={binaryCellPath(500, 300, cellWidth + 30, 202, constrict * 68)}
            fill="#9bc59b"
            opacity="0.12"
          />
          <path
            className="binary-cell-outline"
            d={binaryCellPath(500, 300, cellWidth, 174, constrict * 62)}
            fill="url(#fission-cytoplasm)"
            stroke="url(#fission-membrane)"
            strokeWidth="7"
          />
          <path
            d={binaryCellPath(500, 300, cellWidth - 28, 142, constrict * 50)}
            fill="none"
            stroke="#eef0c8"
            strokeOpacity="0.13"
            strokeWidth="2"
            strokeDasharray="5 13"
          />

          <g
            className="binary-dna binary-dna-original"
            opacity={1 - replicate}
            transform="translate(500 300)"
          >
            <use href="#fission-dna" />
          </g>
          <g
            className="binary-dna binary-dna-copy"
            opacity={replicate}
            transform={`translate(${500 - dnaDistance} 300)`}
          >
            <use href="#fission-dna" />
          </g>
          <g
            className="binary-dna binary-dna-copy"
            opacity={replicate}
            transform={`translate(${500 + dnaDistance} 300) rotate(180)`}
          >
            <use href="#fission-dna" />
          </g>

          {[
            [-118, -39, 7],
            [-74, 47, 10],
            [52, -45, 8],
            [119, 40, 6],
          ].map(([x, y, radius], index) => (
            <circle
              className="binary-cytoplasm-dot"
              cx={500 + x - elongate * Math.sign(x) * 22}
              cy={300 + y}
              r={radius}
              fill={index % 2 ? "#c5d39a" : "#91c18d"}
              opacity="0.24"
              key={`${x}-${y}`}
              style={{ animationDelay: `${index * -0.7}s` }}
            />
          ))}
        </g>

        <g
          className="binary-daughter-cell"
          opacity={daughterOpacity}
          transform={`translate(${500 - daughterDistance} 300) rotate(-5)`}
        >
          <use href="#fission-daughter-cell" />
        </g>
        <g
          className="binary-daughter-cell"
          opacity={daughterOpacity}
          transform={`translate(${500 + daughterDistance} 300) rotate(5)`}
        >
          <use href="#fission-daughter-cell" />
        </g>

        <g className="binary-cell-colony" opacity={colonyOpacity}>
          {colonyCells.map(({ x, y, rotation }, index) => (
            <g
              className="binary-colony-cell"
              transform={`translate(${x} ${y}) rotate(${rotation}) scale(.67)`}
              key={`${x}-${y}`}
              style={{ animationDelay: `${index * -0.55}s` }}
            >
              <use href="#fission-daughter-cell" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function EndosymbiosisAnimation({ progress }: { progress: number }) {
  const approach = phaseProgress(progress, 0.04, 0.24);
  const engulf = phaseProgress(progress, 0.2, 0.43);
  const partnership = phaseProgress(progress, 0.42, 0.7);
  const mitochondrion = phaseProgress(progress, 0.6, 0.82);
  const division = phaseProgress(progress, 0.82, 0.98);
  const bacteriumX =
    790 - approach * 302 - engulf * 74 - division * 118;
  const bacteriumY = 304 - approach * 18 + engulf * 24;
  const bacteriumRotation = -8 + approach * 15 - engulf * 5;
  const membraneStretch = 1 + Math.sin(engulf * Math.PI) * 0.22;
  const captureOpacity = Math.sin(engulf * Math.PI);
  const mainCellX = 350 - division * 118;
  const secondCellX = 350 + division * 322;
  const cellScale = 1 - division * 0.12;
  const energyOpacity =
    Math.max(partnership, mitochondrion) * (1 - division * 0.82);
  const phaseLabel =
    progress < 0.2
      ? "Ein Bakterium nähert sich"
      : progress < 0.43
        ? "Aufgenommen – aber nicht verdaut"
        : progress < 0.7
          ? "Schutz gegen Energie"
          : progress < 0.84
            ? "Aus Mitbewohnern werden Mitochondrien"
            : "Die Partnerschaft wird weitervererbt";

  return (
    <div
      className="endosymbiosis-story"
      role="img"
      aria-label="Animation der Endosymbiose: Eine größere Zelle nimmt ein Bakterium auf. Beide bleiben zusammen und teilen sich später gemeinsam."
    >
      <span className="endosymbiosis-phase">{phaseLabel}</span>
      <svg
        className="endosymbiosis-svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="endo-cytoplasm" cx="42%" cy="37%" r="68%">
            <stop offset="0%" stopColor="#b9d4ae" stopOpacity="0.5" />
            <stop offset="56%" stopColor="#547d66" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#173c37" stopOpacity="0.18" />
          </radialGradient>
          <radialGradient id="endo-nucleus" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#d7dca9" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#557b62" stopOpacity="0.34" />
          </radialGradient>
          <linearGradient id="endo-bacterium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c875" stopOpacity="0.94" />
            <stop offset="52%" stopColor="#b6753e" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#733d29" stopOpacity="0.96" />
          </linearGradient>
          <filter id="endo-cell-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0.5 0 0 0 0.22  0 0.8 0 0 0.45  0 0 0.6 0 0.35  0 0 0 0.7 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="endo-energy-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <g id="endo-cell-body">
            <ellipse
              className="endo-cell-halo"
              rx="165"
              ry="148"
              fill="#8fc4a3"
              opacity="0.12"
            />
            <ellipse
              className="endo-cell-membrane"
              rx="142"
              ry="126"
              fill="url(#endo-cytoplasm)"
              stroke="#c4dfbf"
              strokeOpacity="0.66"
              strokeWidth="5"
            />
            <ellipse
              rx="118"
              ry="104"
              fill="none"
              stroke="#eff0c6"
              strokeOpacity="0.13"
              strokeWidth="2"
              strokeDasharray="5 12"
            />
            <ellipse
              cx="-34"
              cy="-9"
              rx="46"
              ry="41"
              fill="url(#endo-nucleus)"
              stroke="#d9e3ba"
              strokeOpacity="0.34"
              strokeWidth="3"
            />
            <circle cx="-47" cy="-20" r="8" fill="#edf0c4" opacity="0.3" />
            <circle cx="57" cy="-57" r="8" fill="#cbdca9" opacity="0.28" />
            <circle cx="73" cy="49" r="11" fill="#a6ca99" opacity="0.22" />
            <circle cx="-71" cy="64" r="7" fill="#d1d8a5" opacity="0.24" />
          </g>
          <g id="endo-mitochondrion">
            <rect
              x="-47"
              y="-20"
              width="94"
              height="40"
              rx="20"
              fill="url(#endo-bacterium)"
              stroke="#f2d58c"
              strokeOpacity="0.72"
              strokeWidth="3"
            />
            <path
              d="M-30 -7 C-19 9 -7 -12 4 4 S27 -6 34 8"
              fill="none"
              stroke="#5b2f24"
              strokeOpacity="0.9"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M-27 8 C-15 -6 -4 12 8 -4 S28 8 34 -7"
              fill="none"
              stroke="#f3c46c"
              strokeOpacity="0.46"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </defs>

        <g
          className="endo-primary-cell"
          transform={`translate(${mainCellX} 300) scale(${cellScale}) scale(${membraneStretch} 1)`}
        >
          <use href="#endo-cell-body" />
        </g>

        <path
          className="endo-capture-wave"
          d="M470 224 C560 210 604 256 612 300 C604 350 553 388 470 373"
          fill="none"
          stroke="#c9e1bf"
          strokeWidth="13"
          strokeLinecap="round"
          opacity={captureOpacity * 0.8}
          transform={`translate(${engulf * -65} 0)`}
        />

        <g
          className="endo-bacterium"
          transform={`translate(${bacteriumX} ${bacteriumY}) rotate(${bacteriumRotation}) scale(${1 - engulf * 0.14})`}
        >
          <use href="#endo-mitochondrion" />
          <path
            className="endo-flagellum"
            d="M47 0 C78 -31 94 29 128 2"
            fill="none"
            stroke="#ebd398"
            strokeOpacity={Math.max(0, 0.65 - engulf)}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        <g
          className="endo-energy"
          opacity={energyOpacity}
          filter="url(#endo-energy-glow)"
        >
          {[
            [463, 244],
            [501, 270],
            [493, 337],
            [451, 361],
            [422, 263],
            [526, 311],
          ].map(([cx, cy], index) => (
            <circle
              cx={cx}
              cy={cy}
              r={4 + (index % 3)}
              fill={index % 2 ? "#f1d473" : "#b7e0a6"}
              key={`${cx}-${cy}`}
              style={{ animationDelay: `${index * -0.42}s` }}
            />
          ))}
        </g>

        <g
          className="endo-second-cell"
          opacity={division}
          transform={`translate(${secondCellX} 300) scale(${0.76 + division * 0.12})`}
        >
          <use href="#endo-cell-body" />
          <g transform="translate(66 20) rotate(8) scale(.75)">
            <use href="#endo-mitochondrion" />
          </g>
        </g>

        <path
          className="endo-division-bridge"
          d={`M${mainCellX + 122} 300 C${mainCellX + 188} 260 ${secondCellX - 188} 340 ${secondCellX - 122} 300`}
          fill="none"
          stroke="#b9d8b2"
          strokeOpacity={division * (1 - division) * 2.4}
          strokeWidth="13"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const oxygenBubbleSpecs = [
  { left: 31, bottom: 31, size: 5, start: 0.21, end: 0.52, drift: -8 },
  { left: 38, bottom: 28, size: 7, start: 0.29, end: 0.61, drift: 9 },
  { left: 56, bottom: 30, size: 4, start: 0.36, end: 0.68, drift: -5 },
  { left: 67, bottom: 25, size: 6, start: 0.43, end: 0.74, drift: 7 },
  { left: 26, bottom: 24, size: 4, start: 0.47, end: 0.73, drift: 5 },
  { left: 35, bottom: 35, size: 6, start: 0.5, end: 0.78, drift: -10 },
  { left: 45, bottom: 23, size: 5, start: 0.53, end: 0.82, drift: 8 },
  { left: 52, bottom: 32, size: 7, start: 0.56, end: 0.85, drift: -7 },
  { left: 62, bottom: 27, size: 4, start: 0.59, end: 0.87, drift: 6 },
  { left: 72, bottom: 34, size: 6, start: 0.62, end: 0.9, drift: -9 },
  { left: 29, bottom: 22, size: 5, start: 0.65, end: 0.92, drift: 7 },
  { left: 41, bottom: 29, size: 4, start: 0.68, end: 0.94, drift: -6 },
  { left: 58, bottom: 23, size: 6, start: 0.71, end: 0.96, drift: 8 },
  { left: 69, bottom: 29, size: 5, start: 0.74, end: 0.98, drift: -7 },
];

function OxygenPioneerAnimation({ progress }: { progress: number }) {
  const production = phaseProgress(
    progress,
    SCENE_SEVEN_PHOTOSYNTHESIS_START,
    SCENE_SEVEN_BUBBLES_BUILD,
  );
  const abundance = phaseProgress(
    progress,
    SCENE_SEVEN_BUBBLES_BUILD,
    SCENE_SEVEN_NEW_INGREDIENT,
  );
  const follow = phaseProgress(
    progress,
    SCENE_SEVEN_FOLLOW_BUBBLE,
    SCENE_SEVEN_SURFACE_CHANGE,
  );
  const surfaceChange = phaseProgress(
    progress,
    SCENE_SEVEN_SURFACE_CHANGE,
    0.995,
  );

  return (
    <div
      className="oxygen-pioneer-story"
      role="img"
      aria-label="An den Cyanobakterienmatten entstehen zunächst einzelne, dann immer mehr kleine Sauerstoffblasen. Am Ende folgt die Kamera einer Blase bis zur Wasseroberfläche."
      style={
        {
          "--oxygen-production": production,
          "--oxygen-abundance": abundance,
          "--oxygen-follow": follow,
          "--oxygen-surface-change": surfaceChange,
        } as CSSProperties
      }
    >
      <span className="oxygen-mat-glow" />
      <span className="oxygen-bubble-field">
        {oxygenBubbleSpecs.map((bubble, index) => {
          const rise = phaseProgress(progress, bubble.start, bubble.end);
          const reveal = phaseProgress(
            progress,
            bubble.start,
            bubble.start + 0.025,
          );
          const fade =
            1 - phaseProgress(progress, bubble.end - 0.06, bubble.end);
          const opacity =
            reveal * fade * (index < 4 ? 0.72 : 0.42 + abundance * 0.4);

          return (
            <i
              style={{
                left: `${bubble.left}%`,
                bottom: `${bubble.bottom}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                opacity,
                transform: `translate3d(${Math.sin(rise * Math.PI) * bubble.drift}px, ${-rise * 190}px, 0) scale(${0.7 + rise * 0.38})`,
              }}
              key={`oxygen-bubble-${index}`}
            />
          );
        })}
      </span>
      <span
        className="oxygen-follow-bubble"
        style={{
          left: `${53 + follow * 8}%`,
          top: `${69 - follow * 60}%`,
          opacity:
            phaseProgress(progress, 0.755, SCENE_SEVEN_FOLLOW_BUBBLE) *
            (1 - phaseProgress(progress, 0.965, 0.995)),
          transform: `translate(-50%, -50%) scale(${0.72 + follow * 0.62})`,
        }}
      />
      <span className="oxygen-surface-ring" />
      <span className="oxygen-surface-shift" />
    </div>
  );
}

function OxygenRevolutionAnimation({ progress }: { progress: number }) {
  const reaction = phaseProgress(
    progress,
    SCENE_EIGHT_OCEAN_REACTION,
    SCENE_EIGHT_TOXIC_EFFECT,
  );
  const toxicEffect = phaseProgress(
    progress,
    SCENE_EIGHT_TOXIC_EFFECT,
    SCENE_EIGHT_ADAPTATION,
  );
  const adaptation = phaseProgress(
    progress,
    SCENE_EIGHT_ADAPTATION,
    SCENE_EIGHT_ATMOSPHERE_CHANGE,
  );
  const earlyShift =
    phaseProgress(
      progress,
      SCENE_EIGHT_OCEAN_REACTION,
      SCENE_EIGHT_ATMOSPHERE_CHANGE,
    ) * 0.72;
  const finalShift =
    phaseProgress(progress, SCENE_EIGHT_ATMOSPHERE_CHANGE, 0.965) * 0.28;
  const atmosphereShift = Math.min(1, earlyShift + finalShift);
  const microTransition = phaseProgress(
    progress,
    SCENE_EIGHT_MICRO_TRANSITION,
    1,
  );

  return (
    <div
      className="oxygen-revolution-story"
      role="img"
      aria-label="Der gelblich graue Himmel wird langsam heller und zunehmend blau. Das Sonnenlicht klärt sich, und auf dem Ozean entstehen feine Lichtspiegelungen."
      style={
        {
          "--oxygen-reaction": reaction,
          "--oxygen-toxic-effect": toxicEffect,
          "--oxygen-adaptation": adaptation,
          "--oxygen-atmosphere-shift": atmosphereShift,
          "--oxygen-micro-transition": microTransition,
        } as CSSProperties
      }
    >
      <span className="oxygen-yellow-haze" />
      <span className="oxygen-iron-reaction" />
      <span className="oxygen-blue-wash" />
      <span className="oxygen-clear-sunlight" />
      <span className="oxygen-ocean-glints">
        {Array.from({ length: 7 }, (_, index) => (
          <i
            style={
              {
                "--oxygen-glint-index": index,
                left: `${8 + index * 13}%`,
                top: `${70 + (index % 3) * 6}%`,
              } as CSSProperties
            }
            key={`oxygen-glint-${index}`}
          />
        ))}
      </span>
      <span className="oxygen-micro-transition" />
    </div>
  );
}

const complexCellSpecs = [
  { x: 14, y: 19, rx: 11, ry: 14, start: 0.08, dx: 18, dy: -12, turn: 3 },
  { x: 33, y: 43, rx: 20, ry: 16, start: 0.15, dx: 48, dy: -18, turn: 4 },
  { x: 77, y: 30, rx: 15, ry: 20, start: 0.2, dx: -18, dy: 10, turn: -3 },
  { x: 60, y: 60, rx: 13, ry: 17, start: 0.26, dx: -27, dy: -15, turn: -5 },
  { x: 10, y: 66, rx: 11, ry: 17, start: 0.32, dx: 25, dy: -12, turn: 4 },
  { x: 87, y: 72, rx: 11, ry: 10, start: 0.39, dx: -31, dy: -8, turn: -4 },
];

function ComplexCellWorldAnimation({ progress }: { progress: number }) {
  const activity = phaseProgress(progress, 0.045, SCENE_TEN_DIVERSE_BEHAVIOR);
  const diversity = phaseProgress(
    progress,
    SCENE_TEN_DIVERSE_BEHAVIOR,
    SCENE_TEN_VARIANTS,
  );
  const variants = phaseProgress(
    progress,
    SCENE_TEN_VARIANTS,
    SCENE_TEN_SELECTION,
  );
  const selection = phaseProgress(
    progress,
    SCENE_TEN_SELECTION,
    SCENE_TEN_GENERATIONS,
  );
  const generations = phaseProgress(
    progress,
    SCENE_TEN_GENERATIONS,
    SCENE_TEN_SEA_FILLS,
  );
  const finalDiversity = phaseProgress(progress, SCENE_TEN_SEA_FILLS, 0.98);
  const daughterMask =
    "radial-gradient(ellipse 8% 11% at 36% 71%, #000 0 58%, rgba(0, 0, 0, 0.9) 72%, transparent 100%)";

  return (
    <div
      className="complex-cell-world-story"
      role="img"
      aria-label="Die vorhandenen Einzeller treiben ruhig in verschiedene Richtungen, drehen und pulsieren leicht. Eine kleine Zelle teilt sich über viele Generationen, während die Kamera langsam weitere Formen sichtbar macht."
      style={
        {
          "--complex-cell-activity": activity,
          "--complex-cell-diversity": diversity,
          "--complex-cell-variants": variants,
          "--complex-cell-selection": selection,
          "--complex-cell-generations": generations,
          "--complex-cell-final": finalDiversity,
        } as CSSProperties
      }
    >
      <span className="complex-cell-rest-shade" />
      {complexCellSpecs.map((cell, index) => {
        const motion = phaseProgress(progress, cell.start, 0.94);
        const reveal = phaseProgress(progress, cell.start - 0.045, cell.start);
        const pulse =
          1 + Math.sin(motion * Math.PI * 3 + index * 0.9) * 0.018;
        const mask = `radial-gradient(ellipse ${cell.rx}% ${cell.ry}% at ${cell.x}% ${cell.y}%, #000 0 58%, rgba(0, 0, 0, 0.9) 72%, transparent 100%)`;
        const speedGain = 0.68 + diversity * 0.32 + variants * 0.12;

        return (
          <span
            className={`complex-cell-layer complex-cell-layer-${index + 1}`}
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
              opacity: activity * reveal * (0.86 + selection * 0.1),
              transform: `translate3d(${motion * cell.dx * speedGain}px, ${motion * cell.dy * speedGain}px, 0) rotate(${motion * cell.turn}deg) scale(${pulse})`,
              transformOrigin: `${cell.x}% ${cell.y}%`,
            }}
            key={`complex-cell-${index}`}
          />
        );
      })}
      <span
        className="complex-cell-daughter complex-cell-daughter-a"
        style={{
          WebkitMaskImage: daughterMask,
          maskImage: daughterMask,
          opacity: generations * (1 - finalDiversity * 0.22),
          transform: `translate3d(${-generations * 16}px, ${-generations * 8}px, 0) rotate(${-generations * 4}deg) scale(${0.92 - generations * 0.08})`,
        }}
      />
      <span
        className="complex-cell-daughter complex-cell-daughter-b"
        style={{
          WebkitMaskImage: daughterMask,
          maskImage: daughterMask,
          opacity: generations * (1 - finalDiversity * 0.22),
          transform: `translate3d(${generations * 17}px, ${generations * 7}px, 0) rotate(${generations * 5}deg) scale(${0.92 - generations * 0.08})`,
        }}
      />
      <span className="complex-cell-focus-wash" />
      <span className="complex-cell-depth-transition" />
    </div>
  );
}

function CambrianExplosionAnimation({ progress }: { progress: number }) {
  const diversity = phaseProgress(
    progress,
    SCENE_THIRTEEN_DIVERSITY_START,
    SCENE_THIRTEEN_ARMS_RACE_START,
  );
  const features =
    phaseProgress(
      progress,
      SCENE_THIRTEEN_FEATURES_START,
      SCENE_THIRTEEN_FEATURES_START + 0.08,
    ) *
    (1 - phaseProgress(progress, 0.48, 0.58));
  const predatorChase = phaseProgress(
    progress,
    SCENE_THIRTEEN_PREDATOR_PREY_START,
    0.7,
  );
  const armsRace = phaseProgress(
    progress,
    SCENE_THIRTEEN_ARMS_RACE_START,
    0.76,
  );
  const transition = phaseProgress(
    progress,
    SCENE_THIRTEEN_TRANSITION_START,
    0.98,
  );
  const trilobites = [
    { start: 0.14, x: 15, y: 70, travel: 12, scale: 0.72, delay: 0 },
    { start: 0.22, x: 47, y: 63, travel: -9, scale: 0.54, delay: -0.5 },
    { start: 0.34, x: 68, y: 76, travel: 11, scale: 0.63, delay: -1 },
    { start: 0.52, x: 35, y: 82, travel: 15, scale: 0.44, delay: -1.5 },
  ];

  return (
    <div
      className="cambrian-explosion-story"
      role="img"
      aria-label="Die Vielfalt im kambrischen Meer nimmt schrittweise zu: Trilobiten krabbeln, ein früher Gliederfüßer schwimmt, ein Wurm gräbt sich ein und ein Räuber verfolgt Beute."
      style={
        {
          "--cambrian-diversity": diversity,
          "--cambrian-features": features,
          "--cambrian-arms-race": armsRace,
          "--cambrian-transition": transition,
        } as CSSProperties
      }
    >
      <span className="cambrian-water-depth" />
      {trilobites.map((trilobite, index) => {
        const reveal = phaseProgress(
          progress,
          trilobite.start,
          trilobite.start + 0.09,
        );
        const crawl = phaseProgress(progress, trilobite.start, 0.88);
        const fade =
          index === 3 ? 1 - phaseProgress(progress, 0.88, 0.98) : 1;

        return (
          <span
            className={`cambrian-trilobite cambrian-trilobite-${index + 1}`}
            style={
              {
                left: `${trilobite.x + crawl * trilobite.travel}%`,
                top: `${trilobite.y - Math.sin(crawl * Math.PI) * 2}%`,
                opacity: reveal * fade,
                transform: `translate(-50%, -50%) scale(${trilobite.scale}) rotate(${trilobite.travel < 0 ? 176 : -4}deg)`,
                "--cambrian-delay": `${trilobite.delay}s`,
              } as CSSProperties
            }
            key={`cambrian-trilobite-${index}`}
          >
            <i />
          </span>
        );
      })}
      <span
        className="cambrian-swimmer"
        style={{
          opacity: phaseProgress(progress, 0.25, 0.36),
          transform: `translate3d(${-18 + predatorChase * 55}%, ${4 - Math.sin(predatorChase * Math.PI) * 8}%, 0) rotate(${-4 + predatorChase * 5}deg) scale(${0.78 + predatorChase * 0.18})`,
        }}
      >
        <i />
      </span>
      <span
        className="cambrian-prey"
        style={{
          opacity: phaseProgress(
            progress,
            SCENE_THIRTEEN_PREDATOR_PREY_START,
            SCENE_THIRTEEN_PREDATOR_PREY_START + 0.08,
          ),
          transform: `translate3d(${predatorChase * 86}%, ${-predatorChase * 24}%, 0)`,
        }}
      />
      <span
        className="cambrian-burrowing-worm"
        style={{
          opacity:
            phaseProgress(progress, 0.36, 0.47) *
            (1 - phaseProgress(progress, 0.7, 0.8)),
          transform: `translate(-50%, ${28 - armsRace * 72}%) rotate(11deg)`,
        }}
      />
      <span className="cambrian-eye-glints">
        <i />
        <i />
      </span>
      <span className="cambrian-shell-shimmer" />
      <span className="cambrian-diversity-cloud">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            style={
              {
                "--cambrian-index": index,
                "--cambrian-left": `${8 + ((index * 31) % 84)}%`,
                "--cambrian-top": `${18 + ((index * 23) % 65)}%`,
                "--cambrian-size": `${4 + (index % 4) * 2}px`,
                opacity: phaseProgress(
                  progress,
                  SCENE_THIRTEEN_DIVERSITY_START + index * 0.025,
                  SCENE_THIRTEEN_DIVERSITY_START + 0.1 + index * 0.025,
                ),
              } as CSSProperties
            }
            key={`cambrian-life-${index}`}
          />
        ))}
      </span>
      <span
        className="cambrian-transition-trilobite"
        style={{
          opacity: transition * (1 - phaseProgress(progress, 0.95, 1)),
          transform: `translate3d(${transition * 54}vw, ${transition * 18}%, 0) scale(${0.76 + transition * 0.08})`,
        }}
      >
        <i />
      </span>
      <span className="cambrian-rock-mask" />
    </div>
  );
}

function TiktaalikShallowWaterAnimation({ progress }: { progress: number }) {
  const headLift = phaseProgress(
    progress,
    SCENE_SIXTEEN_HEAD_LIFT_START,
    SCENE_SIXTEEN_SUPPORT_START + 0.05,
  );
  const support = phaseProgress(
    progress,
    SCENE_SIXTEEN_SUPPORT_START,
    SCENE_SIXTEEN_PUSH_START + 0.09,
  );
  const slip =
    phaseProgress(progress, 0.55, 0.59) *
    (1 - phaseProgress(progress, 0.61, 0.65));
  const secondPush = phaseProgress(
    progress,
    SCENE_SIXTEEN_SECOND_PUSH,
    SCENE_SIXTEEN_SECOND_PUSH + 0.13,
  );
  const splash =
    phaseProgress(
      progress,
      SCENE_SIXTEEN_PUSH_START,
      SCENE_SIXTEEN_PUSH_START + 0.035,
    ) *
    (1 -
      phaseProgress(
        progress,
        SCENE_SIXTEEN_PUSH_START + 0.055,
        SCENE_SIXTEEN_PUSH_START + 0.14,
      ));
  const transition = phaseProgress(progress, SCENE_SIXTEEN_CROAK, 0.99);
  const headMotion = Math.min(
    1,
    headLift * 0.82 - slip * 0.12 + secondPush * 0.22,
  );
  const bodyMotion = Math.min(
    1,
    support * 0.72 - slip * 0.12 + secondPush * 0.28,
  );

  return (
    <div
      className="tiktaalik-shallow-water-story"
      role="img"
      aria-label="Tiktaalik hebt im Flachwasser vorsichtig den Kopf, stützt sich mit kräftigen Vorderflossen ab, rutscht kurz und bewegt sich mühsam über schlammigen Grund."
      style={
        {
          "--tiktaalik-head-lift": headMotion,
          "--tiktaalik-body-push": bodyMotion,
          "--tiktaalik-support": support,
          "--tiktaalik-splash": splash,
          "--tiktaalik-transition": transition,
        } as CSSProperties
      }
    >
      <span className="tiktaalik-water-current">
        {Array.from({ length: 7 }, (_, index) => (
          <i
            style={
              {
                "--tiktaalik-ripple-index": index,
                left: `${18 + index * 11}%`,
                top: `${65 + (index % 3) * 8}%`,
              } as CSSProperties
            }
            key={`tiktaalik-ripple-${index}`}
          />
        ))}
      </span>
      <span className="tiktaalik-resting-body-shade" />
      <span className="tiktaalik-body-layer" />
      <span className="tiktaalik-resting-head-shade" />
      <span className="tiktaalik-head-layer" />
      <img
        className="tiktaalik-single-splash"
        src="/assets/episode1/scene16/overlay-wassersplash-v1.png"
        alt=""
        draggable={false}
      />
      <span className="tiktaalik-amphibian-focus" />
      <span className="tiktaalik-transition-shade" />
    </div>
  );
}

function MeteorImpactAnimation({ progress }: { progress: number }) {
  const approach = phaseProgress(
    progress,
    SCENE_NINETEEN_METEOR_START,
    SCENE_NINETEEN_IMPACT,
  );
  const reveal = phaseProgress(
    progress,
    SCENE_NINETEEN_METEOR_START,
    SCENE_NINETEEN_METEOR_START + 0.045,
  );
  const vanish =
    1 -
    phaseProgress(
      progress,
      SCENE_NINETEEN_IMPACT - 0.012,
      SCENE_NINETEEN_IMPACT + 0.003,
    );
  const shadowIn = phaseProgress(progress, 0.525, 0.575);
  const shadowOut = 1 - phaseProgress(progress, 0.595, SCENE_NINETEEN_IMPACT);
  const impactBurst = phaseProgress(
    progress,
    SCENE_NINETEEN_IMPACT - 0.008,
    SCENE_NINETEEN_IMPACT + 0.008,
  );
  const impactAfterglow =
    1 -
    phaseProgress(
      progress,
      SCENE_NINETEEN_IMPACT + 0.006,
      SCENE_NINETEEN_FLASH_END,
    );
  const aftermath = phaseProgress(
    progress,
    SCENE_NINETEEN_BLACKOUT_END,
    SCENE_NINETEEN_BLACKOUT_END + 0.08,
  );
  const meteorX = 34 - approach * 132;
  const meteorY = -26 + approach * 104;
  const meteorScale = 0.72 + approach * 0.5;

  return (
    <div
      className="meteor-impact-story"
      role="img"
      aria-label="Ein einzelner Asteroid wird am Himmel heller, rast auf die Erde zu und endet in einem Lichtblitz mit Druckwelle."
      style={
        {
          "--impact-approach": approach,
          "--impact-burst": impactBurst * impactAfterglow,
          "--impact-aftermath": aftermath,
        } as CSSProperties
      }
    >
      <img
        className="impact-shadow-sweep"
        src="/assets/episode1/scene18/overlay-wolkenschatten-v1.png"
        alt=""
        draggable={false}
        style={{
          opacity: shadowIn * shadowOut * 0.5,
          transform: `translate3d(${24 - approach * 72}%, ${8 + approach * 22}%, 0) scale(${1.04 + approach * 0.28})`,
        }}
      />
      <span className="impact-entry-glow" />
      <img
        className="impact-single-meteor"
        src="/assets/episode1/scene19/overlay-meteor-v1.png"
        alt=""
        draggable={false}
        style={{
          opacity: reveal * vanish,
          transform: `translate3d(${meteorX}%, ${meteorY}%, 0) rotate(-5deg) scale(${meteorScale})`,
        }}
      />
      <span className="impact-core" />
      <span className="impact-pressure-wave" />
      <span className="impact-aftermath-veil" />
      <span className="impact-ash-field">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            style={
              {
                "--ash-index": index,
                "--ash-left": `${4 + ((index * 31) % 92)}%`,
                "--ash-top": `${8 + ((index * 23) % 76)}%`,
                "--ash-size": `${2 + (index % 3)}px`,
              } as CSSProperties
            }
            key={`impact-ash-${index}`}
          />
        ))}
      </span>
    </div>
  );
}

function AftermathSurvivorAnimation({ progress }: { progress: number }) {
  const clearing = phaseProgress(progress, 0.035, 0.34);
  const rockFocus = 1 - phaseProgress(progress, 0.18, 0.34);
  const emergence = phaseProgress(
    progress,
    SCENE_TWENTY_MAMMAL_EMERGES,
    SCENE_TWENTY_MAMMAL_EMERGES + 0.11,
  );
  const retreat = phaseProgress(
    progress,
    SCENE_TWENTY_MAMMAL_RETREATS,
    SCENE_TWENTY_MAMMAL_HIDDEN,
  );
  const mammalVisibility = emergence * (1 - retreat);
  const mammalOffset = -4 + emergence * 8 - retreat * 10;
  const groundDust =
    phaseProgress(
      progress,
      SCENE_TWENTY_MAMMAL_EMERGES,
      SCENE_TWENTY_MAMMAL_EMERGES + 0.08,
    ) *
    (1 -
      phaseProgress(
        progress,
        SCENE_TWENTY_MAMMAL_EMERGES + 0.08,
        SCENE_TWENTY_MAMMAL_EMERGES + 0.2,
      ));
  const futureGlow = phaseProgress(progress, 0.86, 0.98);

  return (
    <div
      className="aftermath-survivor-story"
      role="img"
      aria-label="Die Asche lichtet sich. Zuerst steht der Zeitfelsen im Blick, dann kommt ein kleines Säugetier unter einem Baumstamm hervor, schnuppert und zieht sich wieder zurück."
      style={
        {
          "--survivor-clearing": clearing,
          "--survivor-rock-focus": rockFocus,
          "--survivor-mammal-visible": mammalVisibility,
          "--survivor-ground-dust": groundDust,
          "--survivor-future-glow": futureGlow,
        } as CSSProperties
      }
    >
      <img
        className="survivor-dust-cloud"
        src="/assets/episode1/scene20/overlay-staubwolke-v1.png"
        alt=""
        draggable={false}
        style={{
          opacity: 0.58 - clearing * 0.46,
          transform: `translate3d(${-4 - clearing * 11}%, ${4 + clearing * 3}%, 0) scale(${1.08 + clearing * 0.08})`,
        }}
      />
      <img
        className="survivor-ash-cloud"
        src="/assets/episode1/scene20/overlay-aschewolke-v1.png"
        alt=""
        draggable={false}
        style={{
          opacity: 0.36 - clearing * 0.27,
          transform: `translate3d(${8 + clearing * 16}%, ${2 - clearing * 5}%, 0) scale(${1.04 + clearing * 0.06})`,
        }}
      />
      <img
        className="survivor-clearing-mist"
        src="/assets/episode1/scene20/overlay-nebel-lichtet-v1.png"
        alt=""
        draggable={false}
        style={{
          opacity: clearing * (1 - futureGlow) * 0.2,
          transform: `translate3d(${-10 + clearing * 18}%, ${8 - clearing * 6}%, 0) scale(1.08)`,
        }}
      />
      <span className="survivor-time-rock-focus" />
      <span className="survivor-mammal-cover" />
      <span
        className="survivor-mammal-track"
        style={{
          opacity: mammalVisibility,
          transform: `translate3d(${mammalOffset}%, 0, 0)`,
        }}
      >
        <span className="survivor-mammal-image" />
      </span>
      <span className="survivor-ground-dust" />
      <span className="survivor-future-light" />
      <span className="survivor-ash-particles">
        {Array.from({ length: 20 }, (_, index) => (
          <span
            style={
              {
                "--survivor-ash-index": index,
                "--survivor-ash-left": `${2 + ((index * 37) % 96)}%`,
                "--survivor-ash-top": `${5 + ((index * 29) % 72)}%`,
                "--survivor-ash-size": `${1 + (index % 3)}px`,
              } as CSSProperties
            }
            key={`survivor-ash-${index}`}
          />
        ))}
      </span>
    </div>
  );
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
  const timedCaptions = captionTracks[scene.id];
  const activeCaption = timedCaptions
    ? timedCaptions.reduce(
        (active, cue) => (progress >= cue.at ? cue : active),
        timedCaptions[0],
      ).text
    : parts[
        Math.min(parts.length - 1, Math.floor(progress * parts.length))
      ];
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
  const sceneCollectionOverlays = collectionOverlays[scene.id] ?? [];
  const atmosphereProfile = atmosphereProfiles[scene.id];
  const recoveredMediaState = mediaStates[scene.id];
  const hasRecoveredMedia = Boolean(recoveredMediaState);
  const impactFlashOpacity =
    scene.id === 19
      ? phaseProgress(
          progress,
          SCENE_NINETEEN_IMPACT - 0.004,
          SCENE_NINETEEN_IMPACT + 0.006,
        ) *
        (1 -
          phaseProgress(
            progress,
            SCENE_NINETEEN_IMPACT + 0.012,
            SCENE_NINETEEN_FLASH_END,
          ))
      : 0;
  const impactBlackoutOpacity =
    scene.id === 19
      ? phaseProgress(
          progress,
          SCENE_NINETEEN_FLASH_END - 0.004,
          SCENE_NINETEEN_FLASH_END + 0.006,
        ) *
        (1 -
          phaseProgress(
            progress,
            SCENE_NINETEEN_BLACKOUT_END - 0.006,
            SCENE_NINETEEN_BLACKOUT_END,
          ))
      : 0;
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
  const sceneTwoHeatOpacity = Math.max(0.18, 1 - progress * 0.82);
  const rainIntensity = rainIntensityForScene(scene.id, progress);

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
        scene.id === 19 &&
          progress >= SCENE_NINETEEN_IMPACT - 0.006 &&
          progress < SCENE_NINETEEN_FLASH_END &&
          "is-impact-strike",
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
                "--scene-two-rain-opacity": rainIntensity * 0.6,
                "--scene-two-heat-opacity": sceneTwoHeatOpacity,
                "--rain-intensity": rainIntensity,
              } as CSSProperties)
            : isSceneThree
              ? ({
                  "--rain-intensity": rainIntensity,
                } as CSSProperties)
              : isSceneSeven
                ? ({
                    "--scene-seven-follow": phaseProgress(
                      progress,
                      SCENE_SEVEN_FOLLOW_BUBBLE,
                      SCENE_SEVEN_SURFACE_CHANGE,
                    ),
                  } as CSSProperties)
                : isSceneTen
                  ? ({
                      "--scene-ten-zoom-out": phaseProgress(
                        progress,
                        SCENE_TEN_SEA_FILLS,
                        0.98,
                      ),
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
          <>
            <div className="scene-six-media" aria-hidden="true">
              <img
                className="scene-six-background"
                src="/assets/episode1/scene06/hintergrund-ausbreitung-leben-v1.png"
                alt=""
                draggable={false}
              />
            </div>
            <BinaryFissionAnimation progress={progress} />
          </>
        ) : null}
        {isSceneSeven ? (
          <>
            <div className="scene-seven-media" aria-hidden="true">
              <img
                className="scene-seven-background"
                src="/assets/episode1/scene07/hintergrund-cyanobakterien-v1.png"
                alt=""
                draggable={false}
              />
            </div>
            <OxygenPioneerAnimation progress={progress} />
          </>
        ) : null}
        {isSceneEight ? (
          <>
            <div className="scene-eight-media" aria-hidden="true">
              <img
                className="scene-eight-background"
                src="/assets/episode1/scene08/hintergrund-sauerstoffwende-v1.png"
                alt=""
                draggable={false}
              />
            </div>
            <OxygenRevolutionAnimation progress={progress} />
          </>
        ) : null}
        {isSceneNine ? (
          <>
            <div className="scene-nine-media" aria-hidden="true">
              <img
                className="scene-nine-background"
                src="/assets/episode1/scene09/hintergrund-endosymbiose-v1.png"
                alt=""
                draggable={false}
              />
            </div>
            <EndosymbiosisAnimation progress={progress} />
          </>
        ) : null}
        {isSceneTen ? (
          <>
            <div className="scene-ten-media" aria-hidden="true">
              <img
                className="scene-ten-background"
                src="/assets/episode1/scene10/hintergrund-komplexe-einzeller-v1.png"
                alt=""
                draggable={false}
              />
            </div>
            <ComplexCellWorldAnimation progress={progress} />
          </>
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
            {sceneCollectionOverlays.map((overlay) => (
              <img
                className={`collection-overlay ${overlay.className}`}
                src={overlay.src}
                alt=""
                draggable={false}
                key={`${scene.id}-${overlay.className}`}
              />
            ))}
          </div>
        ) : null}
        {atmosphereProfile ? (
          <div
            className={`scene-atmosphere ${atmosphereProfile.className}`}
            aria-hidden="true"
          >
            {Array.from({ length: atmosphereProfile.particles }, (_, index) => (
              <span
                className="atmosphere-particle"
                style={
                  {
                    "--particle-index": index,
                    "--particle-left": `${11 + ((index * 19) % 78)}%`,
                    "--particle-top": `${16 + ((index * 27) % 62)}%`,
                  } as CSSProperties
                }
                key={`${scene.id}-atmosphere-${index}`}
              />
            ))}
          </div>
        ) : null}
        {scene.id === 19 ? <MeteorImpactAnimation progress={progress} /> : null}
        {scene.id === 13 ? (
          <CambrianExplosionAnimation progress={progress} />
        ) : null}
        {scene.id === 16 ? (
          <TiktaalikShallowWaterAnimation progress={progress} />
        ) : null}
        {scene.id === 20 ? (
          <AftermathSurvivorAnimation progress={progress} />
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

      {isSceneTwo || isSceneThree ? (
        <div
          className={`driving-rain driving-rain-scene-${scene.id}`}
          aria-hidden="true"
        >
          <span className="rain-curtain rain-curtain-back" />
          <span className="rain-curtain rain-curtain-middle" />
          <span className="rain-curtain rain-curtain-front" />
          <span className="rain-impact-haze" />
          <span className="rain-splash-field">
            {Array.from({ length: 20 }, (_, index) => (
              <span
                className="rain-splash"
                style={
                  {
                    "--rain-splash-left": `${3 + ((index * 29) % 94)}%`,
                    "--rain-splash-bottom": `${5 + ((index * 17) % 24)}%`,
                    "--rain-splash-delay": `${-(index % 8) * 0.09}s`,
                    "--rain-splash-scale": 0.65 + (index % 5) * 0.13,
                  } as CSSProperties
                }
                key={`rain-splash-${scene.id}-${index}`}
              />
            ))}
          </span>
        </div>
      ) : null}

      {showEnding ? (
        <div className="ending-title" aria-live="polite">
          <span>Zeitreise</span>
          <strong>Die Geschichte des Lebens</strong>
          <small>Episode 2 „Der Weg zum Menschen“</small>
        </div>
      ) : null}

      {scene.id === 19 &&
      progress >= SCENE_NINETEEN_SILENCE_START &&
      progress < SCENE_NINETEEN_IMPACT ? (
        <div className="silence-card">Absolute Stille · 2 Sekunden</div>
      ) : null}
      <div
        className="impact-flash"
        style={{ opacity: impactFlashOpacity }}
        aria-hidden="true"
      />
      <div
        className="impact-blackout"
        style={{ opacity: impactBlackoutOpacity }}
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
            ? `Sprechertext · ${narrationVoiceName}`
            : `Sprechertext · Aufnahme ${narrationVoiceName} ausstehend`}
        </span>
        <p>{activeCaption}</p>
      </div>
    </section>
  );
}
