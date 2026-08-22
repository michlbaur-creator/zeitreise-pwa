"use client";

import type { CSSProperties } from "react";
import type { EpisodeTwoScene } from "../data/episode2";
import { episodeTwoCompactVisuals } from "../data/episode2CompactVisuals";
import { CompactFamilyTree } from "./bildfolge/CompactFamilyTree";

type Props = {
  scene: EpisodeTwoScene;
  isPlaying: boolean;
  progress: number;
  activeHotspot: number | null;
  onHotspot: (index: number) => void;
};

function chapterForScene(sceneId: number) {
  if (sceneId <= 3) return "forest";
  if (sceneId <= 7) return "origins";
  if (sceneId <= 10) return "journey";
  if (sceneId <= 12) return "encounters";
  return "humanity";
}

export function EpisodeTwoVisual({
  scene,
  isPlaying,
  progress,
  activeHotspot,
  onHotspot,
}: Props) {
  const chapter = chapterForScene(scene.id);
  const visual = episodeTwoCompactVisuals.find((item) => item.id === scene.id);
  const secondImageOpacity = Math.min(1, Math.max(0, (progress - 0.46) / 0.16));
  const treeOpacity = Math.min(1, Math.max(0, (progress - 0.38) / 0.18));
  const style = { "--ep2-progress": progress } as CSSProperties;

  return (
    <div
      className={`ep2-visual ep2-${chapter} ep2-compact-scene-${scene.id} ep2-scene-${visual?.overlaySceneId ?? scene.id} ${isPlaying ? "is-playing" : ""}`}
      style={style}
      aria-label={`Szenenbild für Szene ${scene.id}: ${scene.title}`}
    >
      {visual?.images.map((image, index) => (
        <div
          className={`ep2-generated-background ep2-compact-background ep2-compact-background-${index === 0 ? "a" : "b"}`}
          style={{
            backgroundImage: `url("${image.src}")`,
            opacity: index === 0 ? 1 : secondImageOpacity,
          }}
          aria-hidden="true"
          key={image.src}
        />
      ))}

      {visual?.treeStage ? (
        <div className="ep2-family-tree-overlay" style={{ opacity: treeOpacity }}>
          <CompactFamilyTree stage={visual.treeStage} overlay />
        </div>
      ) : null}

      {scene.hotspots.map((hotspot, index) => (
        <button
          type="button"
          className={`ep2-hotspot ep2-hotspot-${index + 1} ${activeHotspot === index ? "is-active" : ""}`}
          onClick={() => onHotspot(index)}
          aria-label={`${hotspot.title} öffnen`}
          aria-pressed={activeHotspot === index}
          key={hotspot.title}
        >
          <span>{index + 1}</span>
        </button>
      ))}
    </div>
  );
}
