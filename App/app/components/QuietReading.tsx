"use client";

import { useEffect, useMemo, useState, type RefObject, type Dispatch, type SetStateAction } from "react";
import { readingCues, readingTextAt, type ReadingCue } from "../data/readingCues";

const QUIET_KEY = "zeitreise-quiet";

/** The existing audio element stays the clock, including after manual seeks. */
export function useVideoAudioSync(videoRef: RefObject<HTMLVideoElement | null>, audioRef: RefObject<HTMLAudioElement | null>, isPlaying: boolean, sceneId: number) {
  useEffect(() => {
    const audio = audioRef.current, video = videoRef.current;
    if (!audio || !video) return;
    function sync() {
      if (!video || !audio || !(video.duration > 0) || !Number.isFinite(video.duration)) return;
      const elapsed = audio.currentTime;
      const finished = !video.loop && elapsed >= video.duration;
      const target = video.loop ? elapsed % video.duration : Math.min(elapsed, Math.max(0, video.duration - 0.001));
      video.muted = true;
      video.playbackRate = 1;
      if (Math.abs(video.currentTime - target) > 0.35) video.currentTime = target;
      if (!isPlaying || finished || matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
      else if (video.paused) void video.play().catch(() => undefined);
    }
    sync();
    audio.addEventListener("timeupdate", sync);
    audio.addEventListener("seeked", sync);
    video.addEventListener("loadedmetadata", sync);
    return () => {
      audio.removeEventListener("timeupdate", sync);
      audio.removeEventListener("seeked", sync);
      video.removeEventListener("loadedmetadata", sync);
    };
  }, [audioRef, videoRef, isPlaying, sceneId]);
}

export function useQuietReading(
  audioRef: RefObject<HTMLAudioElement | null>,
  soundMutedRef: RefObject<boolean>,
  setSoundMuted: Dispatch<SetStateAction<boolean>>,
  setAmbientEnabled: Dispatch<SetStateAction<boolean>>,
) {
  const [quiet, setQuiet] = useState(false);
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      let saved = false;
      try { saved = localStorage.getItem(QUIET_KEY) === "true"; } catch { /* Storage is optional. */ }
      if (!saved) return;
      if (audioRef.current) audioRef.current.muted = true;
      soundMutedRef.current = true;
      setSoundMuted(true);
      setAmbientEnabled(false);
      setQuiet(true);
    });
    return () => { cancelled = true; };
  }, [audioRef, soundMutedRef, setSoundMuted, setAmbientEnabled]);

  function changeQuiet(value: boolean) {
    if (audioRef.current) audioRef.current.muted = value;
    soundMutedRef.current = value;
    setSoundMuted(value);
    if (value) setAmbientEnabled(false);
    setQuiet(value);
    try { localStorage.setItem(QUIET_KEY, String(value)); } catch { /* Storage is optional. */ }
  }
  return { quiet, changeQuiet };
}

export function ReadingControls({ quiet, onChange, onRewind }: {
  quiet: boolean; onChange: (value: boolean) => void; onRewind: () => void;
}) {
  return <div className="quiet-reading-controls" aria-label="Lesemodus">
    <button type="button" aria-pressed={quiet} onClick={() => onChange(!quiet)}>🔇 Leise</button>
    <button type="button" onClick={onRewind} aria-label="10 Sekunden zurückspulen">↶ 10 Sek.</button>
  </div>;
}

export function ReadingSubtitles({ text, progress, cues }: { text: string; progress: number; cues?: readonly ReadingCue[] }) {
  const sections = useMemo(() => readingCues(text, cues), [text, cues]);
  return <div className="quiet-reading-subtitles" aria-label="Sprecheruntertitel" aria-live="off">
    <p>{readingTextAt(sections, progress)}</p>
  </div>;
}
