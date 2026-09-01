"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  type EpisodeThreeScene,
  episodeThreeGraphicScenes,
  episodeThreeSceneImageSequences,
  episodeThreeSceneImages,
  episodeThreeSceneVideos,
} from "../data/episode3";
import { EpisodeThreeChapterEnding } from "./EpisodeThreePartGuide";

type Props = {
  scene: EpisodeThreeScene;
  isPlaying: boolean;
  progress: number;
  onChapterContinue?: () => void;
};

export function EpisodeThreeVisual({
  scene,
  isPlaying,
  progress,
  onChapterContinue,
}: Props) {
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
  const isGraphicScene = episodeThreeGraphicScenes.includes(scene.id as 12 | 18 | 25);
  const [sequenceStart, sequenceEnd] = sequenceWindowForScene(scene.id);
  const sequenceBlend = Math.min(
    1,
    Math.max(0, (progress - sequenceStart) / (sequenceEnd - sequenceStart)),
  );
  const nextPartId = scene.id === 9 ? 2 : scene.id === 15 ? 3 : scene.id === 21 ? 4 : null;
  const transitionStart = scene.id === 21 ? 0.92 : 0.72;
  const showPartTransition = nextPartId && progress >= transitionStart;

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
      {isGraphicScene ? (
        scene.id === 25 ? (
          <NitrogenJourney progress={progress} />
        ) : scene.id === 18 ? (
          <KnowledgeJourney progress={progress} />
        ) : (
          <ClayWritingTimeline progress={progress} />
        )
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
        <EpisodeThreeChapterEnding
          partId={nextPartId}
          onContinue={onChapterContinue}
          actionLabel={onChapterContinue ? `Teil ${nextPartId} beginnen` : undefined}
          statusLabel={!onChapterContinue && nextPartId === 4 ? "Teil 4 folgt" : undefined}
        />
      ) : null}
    </div>
  );
}

function sequenceWindowForScene(sceneId: number): [number, number] {
  if (sceneId === 10) return [0.24, 0.44];
  if (sceneId === 11) return [0.2, 0.42];
  if (sceneId === 13) return [0.44, 0.62];
  if (sceneId === 15) return [0.34, 0.55];
  if (sceneId === 19) return [0.48, 0.64];
  if (sceneId === 21) return [0.68, 0.8];
  if (sceneId === 23) return [0.36, 0.58];
  if (sceneId === 24) return [0.4, 0.62];
  if (sceneId === 27) return [0.36, 0.6];
  return [0.38, 0.62];
}

function NitrogenJourney({ progress }: { progress: number }) {
  const activeStep = progress < 0.24 ? 0 : progress < 0.47 ? 1 : progress < 0.7 ? 2 : 3;
  const stages = [
    { symbol: "N₂", title: "Luft", text: "Stickstoff ist reichlich vorhanden." },
    { symbol: "NH₃", title: "Ammoniak", text: "Druck, Wärme und Energie binden ihn." },
    { symbol: "•••", title: "Dünger", text: "Pflanzen erhalten nutzbare Nährstoffe." },
    { symbol: "≋", title: "Ernte", text: "Mehr Ertrag wird möglich." },
  ];

  return (
    <div className="ep3-nitrogen-journey" aria-hidden="true">
      <div className="ep3-nitrogen-heading">
        <span>Brot aus Luft?</span>
        <strong>Stickstoff wird nutzbar – mit hohem Energieeinsatz.</strong>
      </div>
      <div className="ep3-nitrogen-track"><i style={{ width: `${progress * 100}%` }} /></div>
      <div className="ep3-nitrogen-stages">
        {stages.map((stage, index) => (
          <article className={index <= activeStep ? "is-active" : ""} key={stage.title}>
            <i>{stage.symbol}</i>
            <strong>{stage.title}</strong>
            <small>{stage.text}</small>
          </article>
        ))}
      </div>
      <div className={`ep3-nitrogen-balance ${progress > 0.76 ? "is-visible" : ""}`}>
        <span>mehr Nahrung</span><i>↔</i><span>Energiebedarf · mögliche Überdüngung</span>
      </div>
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

function KnowledgeJourney({ progress }: { progress: number }) {
  const paperProgress = Math.min(1, progress / 0.78);
  const numberProgress = Math.min(1, Math.max(0, (progress - 0.34) / 0.58));
  const activePaperStop = paperProgress < 0.38 ? 0 : paperProgress < 0.72 ? 1 : 2;
  const activeNumberStop = numberProgress < 0.48 ? 0 : numberProgress < 0.82 ? 1 : 2;

  return (
    <div className="ep3-knowledge-journey" aria-hidden="true">
      <div className="ep3-knowledge-heading">
        <span>Wissen unterwegs</span>
        <strong>Nicht nur kopiert. Übersetzt, geprüft, weitergedacht.</strong>
      </div>

      <div className="ep3-knowledge-route ep3-paper-route">
        <div className="ep3-route-label"><i>▱</i><span>Papier</span></div>
        <div className="ep3-route-track"><i style={{ width: `${paperProgress * 100}%` }} /></div>
        {["China", "Asien · arabischsprachige Welt", "Europa"].map((label, index) => (
          <span className={index <= activePaperStop ? "is-active" : ""} key={label}>
            <i>{index + 1}</i>{label}
          </span>
        ))}
      </div>

      <div className="ep3-knowledge-route ep3-number-route">
        <div className="ep3-route-label"><i>9</i><span>Ziffern</span></div>
        <div className="ep3-route-track"><i style={{ width: `${numberProgress * 100}%` }} /></div>
        {["Südasien", "arabischsprachige Gelehrte", "Europa"].map((label, index) => (
          <span className={index <= activeNumberStop ? "is-active" : ""} key={label}>
            <i>{index + 1}</i>{label}
          </span>
        ))}
      </div>

      <div className={`ep3-knowledge-result ${progress > 0.82 ? "is-visible" : ""}`}>
        <span>Übersetzen</span><i>+</i><span>Prüfen</span><i>+</i><span>Ergänzen</span>
        <strong>Wissen verändert sich auf der Reise.</strong>
      </div>
    </div>
  );
}
