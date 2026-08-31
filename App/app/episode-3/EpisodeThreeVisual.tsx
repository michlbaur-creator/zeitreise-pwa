"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  type EpisodeThreeScene,
  episodeThreeGraphicScenes,
  episodeThreeSceneImageSequences,
  episodeThreeSceneImages,
  episodeThreeSceneVideos,
  episodeThreeMotionPreviewScenes,
} from "../data/episode3";
import { episodeThreePart } from "../data/episode3Parts";
import { EpisodeThreeThread } from "./EpisodeThreePartGuide";

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
  const isGraphicScene = episodeThreeGraphicScenes.includes(scene.id as 12);
  const isMotionPreview = episodeThreeMotionPreviewScenes.includes(
    scene.id as 13 | 14,
  );
  const sequenceBlend = Math.min(1, Math.max(0, (progress - 0.38) / 0.24));
  const nextPartId = scene.id === 9 ? 2 : scene.id === 15 ? 3 : null;
  const nextPart = nextPartId ? episodeThreePart(nextPartId) : null;
  const showPartTransition = nextPart && progress >= 0.72;

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
      className={`ep2-visual ep3-visual ${isPlaying ? "is-playing" : ""} ${isMotionPreview ? "is-motion-preview" : ""}`}
      style={{ "--ep2-progress": progress } as CSSProperties}
      aria-label={`Szenenbild für Szene ${scene.id}: ${scene.title}`}
    >
      <div className="stage-topline">
        <span className="time-card">{scene.timeLabel}</span>
      </div>
      {isGraphicScene ? (
        <ClayWritingTimeline progress={progress} />
      ) : imageSequence ? (
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
          style={{
            backgroundImage: `url("${image}")`,
            transform: isMotionPreview
              ? `scale(${1.035 + progress * 0.055}) translateX(${(0.5 - progress) * 1.2}%)`
              : undefined,
          }}
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
      {showPartTransition ? (
        <div className="ep3-chapter-ending" aria-live="polite">
          <div className="ep3-chapter-object" aria-hidden="true">
            <span>{nextPart.symbol}</span>
            <small>{nextPart.object}</small>
          </div>
          <div className="ep3-chapter-ending-copy">
            <span>Die Reise geht weiter · Teil {nextPart.id} von 4</span>
            <strong>{nextPart.title}</strong>
            <p>{nextPart.guidingQuestion}</p>
          </div>
          <EpisodeThreeThread activePart={nextPart.id} />
        </div>
      ) : null}
    </div>
  );
}

function ClayWritingTimeline({ progress }: { progress: number }) {
  const activeStep = progress < 0.34 ? 0 : progress < 0.7 ? 1 : 2;
  const stages = [
    {
      time: "um 3.300 v. Chr.",
      title: "Menge und Gut",
      description: "Zahlzeichen treffen auf einfache Bildzeichen.",
      marks: ["○", "○", "◇", "│", "│"],
    },
    {
      time: "um 3.100 v. Chr.",
      title: "Proto-Keilschrift",
      description: "Verwaltung wird dauerhaft in Ton festgehalten.",
      marks: ["〉", "⋔", "│", "⌃", "〉"],
    },
    {
      time: "um 2.600 v. Chr.",
      title: "Keilzeichen",
      description: "Abstrakte Zeichen können zunehmend Sprache wiedergeben.",
      marks: ["⋔", "〉", "⌃", "│", "⋔", "〉"],
    },
  ];

  return (
    <div className="ep3-writing-timeline" aria-hidden="true">
      <div className="ep3-writing-line"><i style={{ width: `${progress * 100}%` }} /></div>
      {stages.map((stage, index) => (
        <article
          className={index <= activeStep ? "is-revealed" : ""}
          key={stage.time}
        >
          <span>{stage.time}</span>
          <div className={`ep3-clay-tablet ep3-clay-tablet-${index + 1}`}>
            {stage.marks.map((mark, markIndex) => <i key={`${mark}-${markIndex}`}>{mark}</i>)}
          </div>
          <strong>{stage.title}</strong>
          <small>{stage.description}</small>
        </article>
      ))}
    </div>
  );
}
