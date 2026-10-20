"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ZeitreiseApp from "./ZeitreiseApp";
import QuietEntry from "./components/QuietEntry";
import { SiteFooter } from "./components/SiteFooter";
import "./lernpfad/learning-path.css";
export default function Welcome() {
  const [legacy, setLegacy] = useState(false);
  useEffect(() => { const query = new URLSearchParams(window.location.search); if (query.has("start") || query.has("weiter")) queueMicrotask(() => setLegacy(true)); }, []);
  if (legacy) return <ZeitreiseApp />;
  return <main className="lp-shell welcome"><header className="lp-header"><Link href="/">◷ Zeitreise</Link><span>Die Geschichte des Lebens</span></header><section className="welcome-intro"><p className="lp-kicker">Milliarden Jahre. Unzählige Entdeckungen.</p><h1>Deine Reise.<br /><em>Dein Weg.</em></h1><p>Vom ersten Leben bis zu den Städten der Menschen.<br />Wie möchtest du die Zeitreise erleben?</p></section><QuietEntry /><div className="lp-path-grid welcome-ways"><Link className="welcome-way discover-way" href="/entdecken/"><span className="way-icon" aria-hidden="true">◷</span><p className="lp-kicker">Neugier gibt das Tempo vor</p><h2>Zeitreise entdecken</h2><p>Folge den Episoden, sieh dir Filme an und entdecke die Hintergründe. Mit allen Quizzen und Funktionen der Zeitreise.</p><strong>Frei losreisen <span aria-hidden="true">↗</span></strong></Link><Link className="welcome-way classroom-way" href="/lernpfade/"><span className="way-icon" aria-hidden="true">✎</span><p className="lp-kicker">Schritt für Schritt gemeinsam lernen</p><h2>Zeitreise im Unterricht</h2><p>Eine Leitfrage, fünf Stationen und deine eigene Erklärung. Lernpfade mit Quiz, Lernpass und Urkunde begleiten dich.</p><strong>Unterrichtseinheit wählen <span aria-hidden="true">↗</span></strong></Link></div><SiteFooter /></main>;
}
