"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  type EpisodeThreeScene,
  episodeThreeSceneImageSequences,
  episodeThreeSceneImages,
  episodeThreeSceneVideos,
} from "../data/episode3";

type Props = {
  scene: EpisodeThreeScene;
  isPlaying: boolean;
  progress: number;
};

export function EpisodeThreeVisual({ scene, isPlaying, progress }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = episodeThreeSceneVideos[
    scene.id as keyof typeof episodeThreeSceneVideos
  ];
  const image = episodeThreeSceneImages[
    scene.id as keyof typeof episodeThreeSceneImages
  ];
  const imageSequence = episodeThreeSceneImageSequences[
    scene.id as keyof typeof episodeThreeSceneImageSequences
  ];
  const sequenceBlend = Math.min(1, Math.max(0, (progress - 0.38) / 0.24));

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !video) return;
    element.muted = true;
    if (!isPlaying) {
      element.pause();
      return;
    }
    void element.play().catch(() => {
      element.muted = true;
      void element.play().catch(() => undefined);
    });
  }, [isPlaying, scene.id, video]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || progress > 0.002) return;
    element.currentTime = 0;
  }, [progress, scene.id]);

  return (
    <div
      className={`ep2-visual ep3-visual ${isPlaying ? "is-playing" : ""}`}
      style={{ "--ep2-progress": progress } as CSSProperties}
      aria-label={`Szenenbild für Szene ${scene.id}: ${scene.title}`}
    >
      <div className="stage-topline">
        <span className="time-card">{scene.timeLabel}</span>
      </div>
      {imageSequence ? (
        <div className="ep3-scene-image-sequence" aria-hidden="true">
          <div
            className="ep2-generated-background ep3-generated-background ep3-sequence-image ep3-sequence-image-a"
            style={{
              backgroundImage: `url("${imageSequence[0]}")`,
              opacity: 1 - sequenceBlend,
              transform: `scale(${1.02 + progress * 0.035})`,
            }}
          />
          <div
            className="ep2-generated-background ep3-generated-background ep3-sequence-image ep3-sequence-image-b"
            style={{
              backgroundImage: `url("${imageSequence[1]}")`,
              opacity: sequenceBlend,
              transform: `scale(${1.035 + progress * 0.045})`,
            }}
          />
          <div
            className="ep3-village-haze"
            style={{ opacity: Math.max(0, (progress - 0.48) * 0.28) }}
          />
        </div>
      ) : (
        <div
          className="ep2-generated-background ep3-generated-background"
          style={{ backgroundImage: `url("${image}")` }}
          aria-hidden="true"
        />
      )}
      {video ? (
        <video
          ref={videoRef}
          className="ep2-scene-video ep3-scene-video"
          src={video}
          poster={image}
          preload="metadata"
          playsInline
          muted
          aria-hidden="true"
          key={video}
        />
      ) : null}
    </div>
  );
}
