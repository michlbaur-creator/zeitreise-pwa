"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { learningPaths, readProgress, type LearningProgress } from "../data/learningPath";
import { SiteFooter } from "../components/SiteFooter";
import "../lernpfad/learning-path.css";
export default function LearningPaths() {
  const [progress, setProgress] = useState<LearningProgress[] | null>(null);
  useEffect(() => { queueMicrotask(() => { try { setProgress(learningPaths.map(p => readProgress(localStorage.getItem(p.key), p.stations))); } catch { /* Learning remains available without storage. */ } }); }, []);
  return <main className="lp-shell"><header className="lp-header"><Link href="/">◷ Zeitreise</Link><Link href="/episode-3/">Zeitreise ansehen →</Link></header>
    <section className="lp-hero"><div><p className="lp-kicker">Schritt für Schritt entdecken</p><h1>Deine Lernpfade</h1><p>Schau, lies und löse kleine Quizaufgaben. Jeder Lernpfad hat seinen eigenen Lernpass und seine eigene Urkunde.</p></div><div className="lp-pass-mark" aria-hidden="true"><span>◷</span><strong>2 Wege</strong><small>durch Episode 3</small></div></section>
    <div className="lp-path-grid">{learningPaths.map((p, i) => { const saved = progress?.[i]; const completed = saved?.scores.filter(s => s !== null).length ?? 0; const points = saved?.scores.reduce<number>((sum,s) => sum+(s ?? 0),0) ?? 0; return <section className="lp-card lp-path-card" key={p.id}><p className="lp-kicker">Lernpfad {i+1} · Episode 3</p><h2>{p.title}</h2><strong>{p.subtitle}</strong><p>{p.intro}</p><p>5 Stationen · 10 Fragen · ca. {p.duration} Minuten</p><div className="lp-overview-score">{saved ? `${points}/10 Wissenspunkte · ${completed}/5 Stationen` : "Dein eigener Lernpass"}<progress aria-label={`Wissenspunkte: ${p.title}`} max={10} value={points} /></div><Link className="lp-path-link" href={p.href}>{completed === 5 ? "Lernpass ansehen" : completed ? "Fortsetzen" : "Lernpfad starten"} →</Link></section>; })}</div><SiteFooter /></main>;
}
