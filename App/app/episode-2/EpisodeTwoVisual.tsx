"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { EpisodeTwoScene } from "../data/episode2";
import { episodeTwoCompactVisuals } from "../data/episode2CompactVisuals";
import { EpisodeThreeChapterEnding } from "../episode-3/EpisodeThreePartGuide";
import { CompactFamilyTree } from "./bildfolge/CompactFamilyTree";

type Props = {
  scene: EpisodeTwoScene;
  isPlaying: boolean;
  progress: number;
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
}: Props) {
  const chapter = chapterForScene(scene.id);
  const visual = episodeTwoCompactVisuals.find((item) => item.id === scene.id);
  const secondImageOpacity = Math.min(1, Math.max(0, (progress - 0.46) / 0.16));
  const treeOpacity = Math.min(1, Math.max(0, (progress - 0.38) / 0.18));
  const style = { "--ep2-progress": progress } as CSSProperties;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !visual?.video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    video.muted = true;

    if (!isPlaying || reducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Das Standbild bleibt sichtbar, falls ein Browser Video mit Ton blockiert.
    });
  }, [isPlaying, visual?.video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || progress > 0.002 || video.currentTime < 0.15) return;
    video.currentTime = 0;
  }, [progress]);

  return (
    <div
      className={`ep2-visual ep2-${chapter} ep2-compact-scene-${scene.id} ep2-scene-${visual?.overlaySceneId ?? scene.id} ${isPlaying ? "is-playing" : ""}`}
      style={style}
      aria-label={`Szenenbild für Szene ${scene.id}: ${scene.title}`}
    >
      <div className="stage-topline">
        <span className="time-card">{scene.timeLabel}</span>
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

      {visual?.video ? (
        <video
          ref={videoRef}
          className="ep2-scene-video"
          src={visual.video.src}
          poster={visual.video.poster}
          preload="metadata"
          playsInline
          muted
          loop={visual.video.playback === "loop"}
          aria-hidden="true"
        />
      ) : null}

      {visual?.treeStage ? (
        <div className="ep2-family-tree-overlay" style={{ opacity: treeOpacity }}>
          <CompactFamilyTree stage={visual.treeStage} overlay />
        </div>
      ) : null}

      {scene.id === 14 && progress >= 0.72 ? (
        <EpisodeThreeChapterEnding
          partId={1}
          href="/episode-3/?start=1"
          actionLabel="Episode 3 beginnen"
        />
      ) : null}

    </div>
  );
}
