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
      aria-label={`Ruhige animierte Vorschau für Szene ${scene.id}: ${scene.title}`}
    >
      <div className="ep2-sky" aria-hidden="true">
        <i className="ep2-sun" />
        <i className="ep2-cloud ep2-cloud-a" />
        <i className="ep2-cloud ep2-cloud-b" />
      </div>
      <div className="ep2-landscape" aria-hidden="true">
        <i className="ep2-horizon ep2-horizon-back" />
        <i className="ep2-horizon ep2-horizon-front" />
        <i className="ep2-river" />
      </div>
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

      <div className="ep2-forest-elements" aria-hidden="true">
        <i className="ep2-tree ep2-tree-a"><b /></i>
        <i className="ep2-tree ep2-tree-b"><b /></i>
        <i className="ep2-branch"><b className="ep2-animal" /></i>
      </div>

      <div className="ep2-branching-elements" aria-hidden="true">
        <i className="ep2-tree-line ep2-line-trunk" />
        <i className="ep2-tree-line ep2-line-left" />
        <i className="ep2-tree-line ep2-line-right" />
        <i className="ep2-tree-line ep2-line-far" />
      </div>

      <div className="ep2-trace-elements" aria-hidden="true">
        <i className="ep2-footprint ep2-footprint-a" />
        <i className="ep2-footprint ep2-footprint-b" />
        <i className="ep2-footprint ep2-footprint-c" />
        <i className="ep2-figure ep2-figure-a"><b /></i>
        <i className="ep2-figure ep2-figure-b"><b /></i>
      </div>

      <div className="ep2-tool-elements" aria-hidden="true">
        <i className="ep2-stone ep2-stone-a" />
        <i className="ep2-stone ep2-stone-b" />
        <i className="ep2-stone ep2-stone-c" />
        <i className="ep2-spark ep2-spark-a" />
        <i className="ep2-spark ep2-spark-b" />
      </div>

      <div className="ep2-fire-elements" aria-hidden="true">
        <i className="ep2-fire"><b /><b /><b /></i>
        <i className="ep2-smoke ep2-smoke-a" />
        <i className="ep2-smoke ep2-smoke-b" />
      </div>

      <div className="ep2-science-elements" aria-hidden="true">
        <i className="ep2-cave" />
        <i className="ep2-dna ep2-dna-a" />
        <i className="ep2-dna ep2-dna-b" />
        <i className="ep2-connection ep2-connection-a" />
        <i className="ep2-connection ep2-connection-b" />
        <i className="ep2-connection ep2-connection-c" />
      </div>

      <div className="ep2-time-rock-elements" aria-hidden="true">
        <i className="ep2-time-rock"><b /></i>
        <i className="ep2-hand" />
      </div>

      <div className="ep2-dust" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>

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
