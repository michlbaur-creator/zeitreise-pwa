"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  type EpisodeThreeScene,
  episodeThreeSceneImages,
  episodeThreeSceneVideos,
} from "../data/episode3";

type Props = {
  scene: EpisodeThreeScene;
  isPlaying: boolean;
  muted: boolean;
  progress: number;
};

export function EpisodeThreeVisual({ scene, isPlaying, muted, progress }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = episodeThreeSceneVideos[
    scene.id as keyof typeof episodeThreeSceneVideos
  ];
  const image = episodeThreeSceneImages[
    scene.id as keyof typeof episodeThreeSceneImages
  ];

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !video) return;
    element.muted = muted;
    if (!isPlaying) {
      element.pause();
      return;
    }
    void element.play().catch(() => {
      element.muted = true;
      void element.play().catch(() => undefined);
    });
  }, [isPlaying, muted, scene.id, video]);

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
      <div
        className="ep2-generated-background ep3-generated-background"
        style={{ backgroundImage: `url("${image}")` }}
        aria-hidden="true"
      />
      {video ? (
        <video
          ref={videoRef}
          className="ep2-scene-video ep3-scene-video"
          src={video}
          poster={image}
          preload="metadata"
          playsInline
          muted={muted}
          aria-hidden="true"
          key={video}
        />
      ) : null}
    </div>
  );
}
