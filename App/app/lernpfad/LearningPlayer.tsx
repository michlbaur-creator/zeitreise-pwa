"use client";
import { useEffect, useRef, useState } from "react";
import { EpisodeThreeVisual } from "../episode-3/EpisodeThreeVisual";
import { ReadingControls, ReadingSubtitles, useQuietReading } from "../components/QuietReading";
import { episodeThreeSceneAudio, type EpisodeThreeScene } from "../data/episode3";

import { type LearningScene } from "../data/learningPath";
import { SceneVisual } from "../components/SceneVisual";
import { EpisodeTwoVisual } from "../episode-2/EpisodeTwoVisual";
import type { Scene } from "../data/scenes";
import type { EpisodeTwoScene } from "../data/episode2";
import { episodeTwoSceneSoundtrack } from "../data/episode2CompactVisuals";
import { captionTracks } from "../data/captions";
import { narrationTracks } from "../data/narration";
import { episodeOneSceneSoundtrack } from "../data/episode1Videos";

export default function LearningPlayer({ scenes, episode = 3, onQuiz }: { scenes: LearningScene[]; episode?: 1 | 2 | 3; onQuiz: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(false);
  const [, setAmbient] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mutedRef = useRef(false);
  const { quiet, changeQuiet } = useQuietReading(audioRef, mutedRef, setMuted, setAmbient);
  const scene = scenes[index];
  useEffect(() => {
    const audio = audioRef.current;
    if (playing) void audio?.play().catch(() => setPlaying(false));
    else audio?.pause();
  }, [playing, scene.id]);
  function seek(value: number) {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) { audio.currentTime = Math.max(0, Math.min(audio.duration, value)); setProgress(audio.currentTime / audio.duration); }
  }
  function next(nextIndex: number) {
    audioRef.current?.pause();
    setIndex(nextIndex); setProgress(0); setError(false); setPlaying(true);
  }
  function quiz() { audioRef.current?.pause(); setPlaying(false); onQuiz(); }
  return <section className={`lp-media ${quiet ? "quiet-reading-player" : ""}`} aria-label="Szenen der Station">
    <p className="lp-kicker">Szene {index + 1} von {scenes.length} · {scene.timeLabel}</p>
    <h2>{scene.title}</h2>
    <ReadingControls quiet={quiet} onChange={changeQuiet} onRewind={() => seek((audioRef.current?.currentTime ?? 0) - 10)} />
    {episode === 1 ? <SceneVisual scene={scene.original as Scene} isPlaying={playing} progress={progress} audioRef={audioRef} hasNarration={true} narrationVoiceName="Micha" discoveryActive={false} discovered={[]} onDiscover={() => {}} /> : episode === 2 ? <EpisodeTwoVisual scene={scene.original as EpisodeTwoScene} isPlaying={playing} progress={progress} audioRef={audioRef} /> : <EpisodeThreeVisual scene={scene as EpisodeThreeScene} isPlaying={playing} progress={progress} audioRef={audioRef} />}
    <audio ref={audioRef} src={episode === 1 ? episodeOneSceneSoundtrack(scene.id) ?? narrationTracks[scene.id] : episode === 2 ? episodeTwoSceneSoundtrack(scene.id) ?? (scene.original as EpisodeTwoScene).audioPath : episodeThreeSceneAudio[scene.id as keyof typeof episodeThreeSceneAudio]} muted={muted} preload="metadata"
      onCanPlay={() => { if (playing) void audioRef.current?.play().catch(() => setPlaying(false)); }}
      onTimeUpdate={e => { const a=e.currentTarget; if (a.duration > 0) setProgress(a.currentTime/a.duration); }}
      onEnded={() => { setPlaying(false); setProgress(1); }} onError={() => { setError(true); setPlaying(false); }} />
    {quiet && <ReadingSubtitles text={scene.speakerText.join(" ")} progress={progress} cues={episode === 1 ? captionTracks[scene.id] : undefined} />}
    <div className="lp-player-controls">
      <button disabled={index === 0} onClick={() => next(index - 1)} aria-label="Vorherige Szene">←</button>
      <button className="lp-primary" onClick={() => { if(progress >= 1) seek(0); setPlaying(!playing); }}>{playing ? "Pause" : progress >= 1 ? "Noch einmal" : "Szene starten"}</button>
      <label className="lp-seek">Position<input aria-label="Position in der Szene" type="range" min="0" max="1000" value={Math.round(progress*1000)} onChange={e => seek(Number(e.target.value)/1000*(audioRef.current?.duration ?? 0))} /></label>
      {index < scenes.length - 1 ? <button onClick={() => next(index + 1)}>Weiter →</button> : <button onClick={quiz}>Zum Stations-Check →</button>}
    </div>
    {error && <p role="alert">Die Aufnahme konnte nicht geladen werden. Du kannst den vollständigen Text unten lesen und den Stations-Check trotzdem bearbeiten.</p>}
    <details className="lp-text"><summary>Sprechertext vollständig lesen</summary>{scene.speakerText.map(p => <p key={p}>{p}</p>)}</details>
    <div className="lp-discoveries"><h3>Genauer hinsehen</h3>{scene.discoveries.map(d => <p key={d.title}><strong>{d.title}</strong><br />{d.text}</p>)}</div>
  </section>;
}
